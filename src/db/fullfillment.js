const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const FullfillmentSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        _sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        _orderId: { type: mongoose.Schema.Types.ObjectId, required: true },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Fullfillment = mongoose.model('Fullfillment', FullfillmentSchema);

const customizationOptions = { removeFields: ['createdAt', 'updatedAt'] };
const FullfillmentTC = composeMongoose(Fullfillment, customizationOptions);

module.exports = { FullfillmentSchema, Fullfillment, FullfillmentTC }