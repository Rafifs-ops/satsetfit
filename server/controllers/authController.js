const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendOtpEmail } = require('../utils/email');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Helper function untuk generate, hash, dan kirim OTP via email (dengan masa berlaku 5 menit)
const generateAndSendOtp = async (email, purpose, username) => {
    // Generate 6 angka acak
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hapus OTP lama dengan email & purpose yang sama
    await Otp.deleteMany({ email, purpose });

    // Hash OTP sebelum simpan di DB
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Simpan ke database (model Otp memiliki TTL index 300 detik = 5 menit)
    await Otp.create({
        email,
        otp: hashedOtp,
        purpose
    });

    // Kirim via nodemailer email service
    await sendOtpEmail({
        to: email,
        otp,
        purpose,
        username
    });
};

exports.register = async (req, res) => {
    try {
        // Mendapatkan data yang dikirim dari frontend (client)
        const { username, email, password, jenis_kelamin } = req.body;

        // Cek user lama
        let user = await User.findOne({ email });
        if (user) {
            if (!user.emailVerifiedAt) {
                // Jika email ada tapi belum terverifikasi, perbarui info akun & kirim ulang OTP
                const salt = await bcrypt.genSalt(10);
                user.username = username;
                user.password = await bcrypt.hash(password, salt);
                user.jenis_kelamin = jenis_kelamin;
                await user.save();

                await generateAndSendOtp(email, 'VERIFY_EMAIL', username);

                return res.status(200).json({
                    msg: 'Akun belum terverifikasi. Kode OTP verifikasi baru telah dikirim ke email Anda.',
                    needVerification: true,
                    email: user.email
                });
            }
            return res.status(400).json({ msg: 'Email sudah terdaftar' });
        }

        // Cek apakah username sudah ada
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ msg: 'Username sudah digunakan' });
        }

        // Enkripsi password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            jenis_kelamin,
            emailVerifiedAt: null
        });
        await user.save();

        await generateAndSendOtp(email, 'VERIFY_EMAIL', username);

        res.status(201).json({
            msg: 'Registrasi berhasil. Kode OTP 6 angka telah dikirim ke email Anda untuk verifikasi.',
            needVerification: true,
            email: user.email
        });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    try {
        // Mendapatkan data yang dikirim dari frontend (client)
        const { username, password } = req.body;

        // Cek user berdasarkan username atau email
        const user = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });
        if (!user) return res.status(400).json({ msg: 'User tidak ditemukan' });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Password salah' });

        // Cek verifikasi email (berdasarkan field emailVerifiedAt)
        if (!user.emailVerifiedAt) {
            await generateAndSendOtp(user.email, 'VERIFY_EMAIL', user.username);
            return res.status(403).json({
                msg: 'Email belum diverifikasi. Kode OTP verifikasi telah dikirim ke email Anda.',
                needVerification: true,
                email: user.email
            });
        }

        // 2. Server validasi -> jika valid, server buat token jwt dengan payload data user yg didapat di database
        const payloadData = {
            id: user.id,
            username: user.username,
            email: user.email,
            isPremium: user.isPremium,
            jenis_kelamin: user.jenis_kelamin,
            historyResults: user.historyResults,
            emailVerifiedAt: user.emailVerifiedAt
        };

        const accessToken = jwt.sign(payloadData, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payloadData, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 3. Server kirim token ke client (access dan refresh token jwt) dengan header set-cookie dengan httpOnly dan secure
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        };

        res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ msg: 'Login berhasil' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// 6. Server validasi token jwt dari cookie
// 7. Jika valid, maka token akan didecode menjadi data(objek) user dengan tambahan key isLogin(boolean)
// 8. Objek tersebut akan langsung dikirim ke sisi client (frontend)
exports.validateSession = async (req, res) => {
    try {
        let token = req.cookies && (req.cookies.accessToken || req.cookies.refreshToken);

        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ isLogin: false, msg: 'Token tidak ditemukan' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userData = decoded.user || decoded;

        if (userData.id) {
            const userFound = await User.findById(userData.id);
            if (userFound) {
                if (!userFound.emailVerifiedAt) {
                    return res.status(401).json({
                        isLogin: false,
                        msg: 'Email belum terverifikasi',
                        needVerification: true,
                        email: userFound.email
                    });
                }

                const userObject = {
                    id: userFound.id,
                    username: userFound.username,
                    email: userFound.email,
                    isPremium: userFound.isPremium,
                    jenis_kelamin: userFound.jenis_kelamin,
                    historyResults: userFound.historyResults,
                    emailVerifiedAt: userFound.emailVerifiedAt,
                    isLogin: true
                };
                return res.status(200).json(userObject);
            }
        }

        const userObject = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            isPremium: userData.isPremium,
            jenis_kelamin: userData.jenis_kelamin,
            historyResults: userData.historyResults,
            emailVerifiedAt: userData.emailVerifiedAt,
            isLogin: true
        };

        res.status(200).json(userObject);
    } catch (err) {
        return res.status(401).json({ isLogin: false, msg: 'Token tidak valid' });
    }
};

exports.getMe = exports.validateSession;

exports.logout = (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    };
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    res.status(200).json({ msg: 'Logout berhasil' });
};

// Verifikasi email menggunakan kode OTP 6 angka yang dikirim ke email
exports.verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ msg: 'Email dan kode OTP wajib diisi' });
        }

        // Cari record OTP (mengambil yang terbaru bila ada lebih dari satu)
        const otpRecord = await Otp.findOne({ email, purpose: 'VERIFY_EMAIL' }).sort({ createdAt: -1 });
        if (!otpRecord) {
            return res.status(400).json({ msg: 'Kode OTP tidak ditemukan atau sudah kadaluwarsa' });
        }

        // Cek kadaluwarsa (<= 5 menit / 300 detik)
        const now = new Date();
        const diffInSeconds = (now.getTime() - new Date(otpRecord.createdAt).getTime()) / 1000;
        if (diffInSeconds > 300) {
            await Otp.deleteMany({ email, purpose: 'VERIFY_EMAIL' });
            return res.status(400).json({ msg: 'Kode OTP sudah kadaluwarsa (berlaku 5 menit)' });
        }

        // Cek kecocokan OTP (sudah di-hash dengan bcrypt)
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Kode OTP salah' });
        }

        // Update emailVerifiedAt di User model
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        user.emailVerifiedAt = new Date();
        await user.save();

        // Hapus semua OTP verifikasi untuk email ini
        await Otp.deleteMany({ email, purpose: 'VERIFY_EMAIL' });

        res.status(200).json({ msg: 'Verifikasi email berhasil! Silakan login.' });
    } catch (err) {
        console.error('Verify email error:', err.message);
        res.status(500).send('Server Error');
    }
};

// Kirim ulang kode OTP (resend OTP)
exports.resendOtp = async (req, res) => {
    try {
        const { email, purpose = 'VERIFY_EMAIL' } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Email wajib diisi' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        if (purpose === 'VERIFY_EMAIL' && user.emailVerifiedAt) {
            return res.status(400).json({ msg: 'Email sudah terverifikasi' });
        }

        await generateAndSendOtp(email, purpose, user.username);

        res.status(200).json({ msg: 'Kode OTP baru berhasil dikirim ke email Anda' });
    } catch (err) {
        console.error('Resend OTP error:', err.message);
        res.status(500).send('Server Error');
    }
};

// Request forgot password -> kirim OTP reset password ke email
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Email wajib diisi' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'Email tidak ditemukan di sistem' });
        }

        await generateAndSendOtp(email, 'RESET_PASSWORD', user.username);

        res.status(200).json({
            msg: 'Kode OTP untuk reset password telah dikirim ke email Anda',
            email: user.email
        });
    } catch (err) {
        console.error('Forgot password error:', err.message);
        res.status(500).send('Server Error');
    }
};

// Reset password -> verifikasi OTP dan perbarui password user
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ msg: 'Email, kode OTP, dan password baru wajib diisi' });
        }

        // Cari record OTP
        const otpRecord = await Otp.findOne({ email, purpose: 'RESET_PASSWORD' }).sort({ createdAt: -1 });
        if (!otpRecord) {
            return res.status(400).json({ msg: 'Kode OTP tidak ditemukan atau sudah kadaluwarsa' });
        }

        // Cek kadaluwarsa (<= 5 menit)
        const now = new Date();
        const diffInSeconds = (now.getTime() - new Date(otpRecord.createdAt).getTime()) / 1000;
        if (diffInSeconds > 300) {
            await Otp.deleteMany({ email, purpose: 'RESET_PASSWORD' });
            return res.status(400).json({ msg: 'Kode OTP sudah kadaluwarsa (berlaku 5 menit)' });
        }

        // Cek kecocokan OTP (sudah di-hash)
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Kode OTP salah' });
        }

        // Update password user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        // Hapus semua OTP reset password untuk email ini
        await Otp.deleteMany({ email, purpose: 'RESET_PASSWORD' });

        res.status(200).json({ msg: 'Password berhasil diubah! Silakan login dengan password baru.' });
    } catch (err) {
        console.error('Reset password error:', err.message);
        res.status(500).send('Server Error');
    }
};