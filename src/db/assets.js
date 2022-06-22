const mongoose = require('mongoose');

const AssetsSchema = new mongoose.Schema(
    {
        assetId: { type: Number, required: true },
        size: { type: Number, default: 0 },
        mimeType: { type: String, required: true },
        location: { type: String, required: true },
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