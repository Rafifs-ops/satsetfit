const User = require('../models/User');
const mongoose = require('mongoose');

exports.validatePremExp = async (req, res) => {
    try {
        const { id } = req.body; // Mendapatkan data yang dikirim dari frontend (client)
        const now = new Date();

        // Mencari user di database dengan id
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        } // jika user tidak ada

        const expiryDate = user.premiumExpiresAt;

        if (expiryDate && now > expiryDate) { // Jika masa premium user sudah melewati masa kadaluarsanya
            await User.updateOne(
                { _id: user._id }, // Gunakan user._id yang sudah didapat
                { $set: { isPremium: false, premiumExpiresAt: null } } // Merubah status premium user menjadi false (nonaktif)
            );
            return res.status(200).json({
                msg: "Masa premium telah berakhir",
                status: "expired"
            });
        }

        return res.status(200).json({
            msg: "Masa premium masih berlaku",
            status: "active"
        });
    }
    catch (e) {
        console.error("Error validating premium status:", e);
        return res.status(500).json({ msg: "Server Error" });
    }
}

exports.upgradePrem = async (req, res) => {
    try {
        const { id } = req.body; // Mendapatkan data yang dikirim dari frontend (client)
        const now = new Date();
        const expiryDate = new Date(now.setDate(now.getDate() + 30));

        await User.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
                $set: {
                    isPremium: true, // Merubah status premium user menjadi true (aktif)
                    premiumExpiresAt: expiryDate
                }
            }
        );
        // Tambahkan res.json() agar client tahu proses selesai
        res.status(200).json({ msg: "Upgrade success" });
    } catch (error) {
        console.error("Upgrade error:", error);
        res.status(500).json({ msg: "Server Error saat upgrade premium" });
    }
}