const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const PayoutsSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        _sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        commissions: {
            type: [{
                _categoryId: mongoose.Schema.Types.ObjectId,
                percentage: Number,
                orderIds: [mongoose.Schema.Types.ObjectId],
                amount: Number,
                payoutDate: Date,
                payoutStatus: {
                    type: String,
                    enum: ['pending', 'in_progress', 'complete'],
                }
            }],
            required: true
        },
        totalAmount: { type: Number, default: 0 },
        payoutDate: Date,
        overallStatus: {
            type: String,
            enum: ['pending', 'in_progress', 'complete'],
        },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Payouts = mongoose.model('Payouts', PayoutsSchema);

const customizationOptions = { removeFields: ['createdAt', 'updatedAt'] };
const PayoutsTC = composeMongoose(Payouts, customizationOptions);

module.exports = { PayoutsSchema, Payouts, PayoutsTC }