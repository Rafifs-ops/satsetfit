const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
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
        const { username, password } = req.body;

        // Cek user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'User tidak ditemukan' });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Password salah' });

        // Buat Token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    isPremium: user.isPremium,
                    jenis_kelamin: user.jenis_kelamin,
                    historyResults: user.historyResults
                }
            });
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};