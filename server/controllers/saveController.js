const User = require('../models/User');
const mongoose = require('mongoose');

exports.saveCalcResult = async (req, res) => {
    try {
        const { id, date, bmi, bmr, tdde } = req.body;
        const hasilHitung = {
            date: date,
            hasilBmi: bmi,
            hasilBmr: bmr,
            hasilTdde: tdde
        };

        await User.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $push: { historyResults: hasilHitung } })
        res.status(200).json({ msg: 'Hasil perhitungan berhasil disimpan' });
    } catch {
        console.error(error);
        res.status(500).send('Server Error saat menyimpan data');
    }
}