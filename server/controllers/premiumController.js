const User = require('../models/User');
const mongoose = require('mongoose');

exports.validatePremExp = async (req, res) => {
    try {
        const { id } = req.body; // Mendapatkan data yang dikirim dari frontend (client)
        const now = new Date();

        // Mencari user di database dengan id
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

        if (!user) return; // jika user tidak ada, hentikan program

        const expiryDate = user.premiumExpiresAt;

        if (expiryDate && now > expiryDate) { // Jika masa premium user sudah melewati masa kadaluarsanya
            await User.updateOne(
                { _id: user._id }, // Gunakan user._id yang sudah didapat
                { $set: { isPremium: false, premiumExpiresAt: null } } // Merubah status premium user menjadi false (nonaktif)
            );
            res.status(200).json({ msg: "Ubah status selesai" });
        }

        res.status(200).json({ msg: "Masa premium masih berlaku" });
    }
    catch (e) {
        console.error("Error validating premium status:", e);
    }
}

exports.upgradePrem = async (req, res) => {
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
}