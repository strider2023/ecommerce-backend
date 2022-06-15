const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        loginType: {
            type: String,
            enum: ['sso', 'password', 'otp'],
            default: 'password'
        },
        refreshToken: { type: String, required: true  },
        expires: { type: Date, required: true },
        ip: { type: String, default: "0.0.0.0" },
        user_agent: { type: String, default: "" },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
            default: 'active',
            required: true
        },
    },
    { timestamps: true }
);

const UserSession = mongoose.model('UserSession', UserSessionSchema);

module.exports = {
    UserSessionSchema: UserSessionSchema,
    UserSession: UserSession
}