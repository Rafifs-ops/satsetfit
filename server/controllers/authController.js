const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.register = async (req, res) => {
    try {
        // Mendapatkan data yang dikirim dari frontend (client)
        const { username, email, password, jenis_kelamin } = req.body;

        // Cek user lama
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Email sudah terdaftar' });

        // Enkripsi password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, email, password: hashedPassword, jenis_kelamin });
        await user.save();

        res.status(201).json({ msg: 'Registrasi berhasil, silakan login' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    try {
        // Mendapatkan data yang dikirim dari frontend (client)
        const { username, password } = req.body;

        // Cek user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'User tidak ditemukan' });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Password salah' });

        // 2. Server validasi -> jika valid, server buat token jwt dengan payload data user yg didapat di database
        const payloadData = {
            id: user.id,
            username: user.username,
            email: user.email,
            isPremium: user.isPremium,
            jenis_kelamin: user.jenis_kelamin,
            historyResults: user.historyResults
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
                const userObject = {
                    id: userFound.id,
                    username: userFound.username,
                    email: userFound.email,
                    isPremium: userFound.isPremium,
                    jenis_kelamin: userFound.jenis_kelamin,
                    historyResults: userFound.historyResults,
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