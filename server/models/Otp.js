const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    otp: { 
        type: String, 
        required: true // Hashed OTP code
    },
    purpose: {
        type: String,
        enum: ['VERIFY_EMAIL', 'RESET_PASSWORD'],
        default: 'VERIFY_EMAIL',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 300 detik = 5 menit (TTL index di MongoDB)
    }
});

module.exports = mongoose.model('Otp', OtpSchema);
