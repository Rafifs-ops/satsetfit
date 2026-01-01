const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    isPremium: { type: Boolean, default: false },
    jenis_kelamin: { type: String, enum: ['Laki-laki', 'Perempuan'], required: true },
    historyResults: { type: Array },
    premiumExpiresAt: {type: Date, default: null},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);