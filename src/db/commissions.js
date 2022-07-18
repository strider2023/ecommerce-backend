const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const CommissionsSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        _sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        commissions: {
            type: [{
                _categoryId: mongoose.Schema.Types.ObjectId,
                percentage: Number,
                startDate: Date,
                endDate: Date
            }],
            required: true
        },
        metadata: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Commissions = mongoose.model('Commissions', CommissionsSchema);

const customizationOptions = { removeFields: ['createdAt', 'updatedAt'] };
const CommissionsTC = composeMongoose(Commissions, customizationOptions);

module.exports = { CommissionsSchema, Commissions, CommissionsTC }