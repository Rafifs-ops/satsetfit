const User = require('../models/User');
const mongoose = require('mongoose');

exports.validatePremExp = async (req, res) => {
    try {
        const { id } = req.body;
        const now = new Date();

        // 2. Gunakan mongoose.Types.ObjectId dan await
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

        if (!user) return; // Handle jika user tidak ada

        const expiryDate = user.premiumExpiresAt;

        if (expiryDate && now > expiryDate) { // Cek expiryDate ada isinya atau null
            await User.updateOne(
                { _id: user._id }, // Gunakan user._id yang sudah didapat
                { $set: { isPremium: false, premiumExpiresAt: null } }
            );
        }
    }
    catch (e) {
        console.error("Error validating premium status:", e);
    }
}

exports.upgradePrem = async (req, res) => {
    const { id } = req.body;
    const now = new Date();
    const expiryDate = new Date(now.setDate(now.getDate() + 30));

    // 3. Gunakan mongoose.Types.ObjectId
    await User.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        {
            $set: {
                isPremium: true,
                premiumExpiresAt: expiryDate
            }
        }
    );
    // Tambahkan res.json() agar client tahu proses selesai
    res.status(200).json({ msg: "Upgrade success" });
}