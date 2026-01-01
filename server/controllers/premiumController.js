const User = require('../models/User');

exports.validatePremExp = async (req, res) => {
    try {
        const { id } = req.body;
        const now = new Date(); // Mengambil waktu sekarang (realtime)
        const expiryDate = User.findOne({ _id: ObjectId(id) }).premiumExpiresAt;

        // Jika waktu sekarang LEBIH BESAR dari waktu expiry (sudah lewat)
        if (now > expiryDate) {
            // Update database: cabut status premium
            await User.updateOne(
                { _id: ObjectId(id) },
                {
                    $set: { isPremium: false }
                }
            );
        }
    }
    catch (e) {
        console.error("Error validating premium status:", e);
    }
}

exports.upgradePrem = async (req, res) => {

    const { id } = req.body;

    // --- MENENTUKAN EXPIRE DARI FITUR PREMIUM ---
    const now = new Date();
    const expiryDate = new Date(now.setDate(now.getDate() + 30)); // Menambahkan 30 hari dari hari ini

    await User.updateOne(
        { _id: ObjectId(id) },
        {
            $set: {
                isPremium: true,
                premiumExpiresAt: expiryDate // Simpan tanggal kedaluwarsa
            }
        }
    );
}