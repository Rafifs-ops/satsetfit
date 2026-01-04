const User = require('../models/User');
const mongoose = require('mongoose');

exports.saveCalcResult = async (req, res) => {
    try {
        // 1. Ambil data langsung dari req.body (Sesuai kiriman Client)
        const { id, date, bmi, bmr, tdde } = req.body;

        // 2. Validasi ID
        if (!id) {
            return res.status(400).json({ msg: "User ID tidak ditemukan dalam data kiriman." });
        }

        // 3. Mapping data ke nama field yang SESUAI di User.js
        const hasilHitung = {
            date: date,          
            hasilBmi: Number(bmi),       
            hasilBmr: Number(bmr),       
            hasilTdde: Number(tdde)    
        };

        // 4. Lakukan update
        const result = await User.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $push: { historyResults: hasilHitung } },
            { runValidators: true }
        );

        // 5. Cek hasil update
        if (result.matchedCount === 0) {
            return res.status(404).json({ msg: 'User tidak ditemukan atau ID salah' });
        }

        res.status(200).json({ msg: 'Hasil perhitungan berhasil disimpan' });

    } catch (error) {
        // Log error lengkap agar terlihat di terminal jika ada masalah validasi Mongoose
        console.error("Error detail saat menyimpan data:", error);
        res.status(500).send('Server Error saat menyimpan data');
    }
}