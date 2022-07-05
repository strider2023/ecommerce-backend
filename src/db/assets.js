const mongoose = require('mongoose');

const AssetsSchema = new mongoose.Schema(
    {
        assetId: { type: Number, unique: true, required: true },
        size: { type: Number, default: 0, required: true },
        mimetype: { type: String, required: true },
        path: { type: String, required: true },
        originalname: { type: String, required: true},
        filename: { type: String, required: true},
        storageType: {
            type: String,
            enum: ['local', 's3'],
            required: true,
            default: 'local'
        },
    },
    { timestamps: true }
);

const Assets = mongoose.model('Assets', AssetsSchema);

module.exports = {
    AssetsSchema,
    Assets
}