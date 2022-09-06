const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        otp: { type: String, required: true, default: '' },
        expires: { type: Date, default: new Date(), required: true },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
            required: true,
            default: 'active'
        },
    },
    { timestamps: true }
);

const Otp = mongoose.model('Otp', OtpSchema);

module.exports = { Otp, OtpSchema }