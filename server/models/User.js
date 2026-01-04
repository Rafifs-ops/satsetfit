const mongoose = require('mongoose');

// Schema kecil untuk hasil hitung
const HistorySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    hasilBmi: { type: Number, required: true },
    hasilBmr: { type: Number, required: true },
    hasilTdde: { type: Number, required: true }
}, { _id: false }); // _id false agar tidak boros membuat ID unik untuk setiap item history

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    jenis_kelamin: { type: String, enum: ['Laki-laki', 'Perempuan'], required: true },
    historyResults: [HistorySchema],
    premiumExpiresAt: { type: Date, default: null },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);