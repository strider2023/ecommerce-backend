const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, default: '' },
        currency: { type: String, default: '' },
        totalCost: { type: Number, default: 0 },
        items: {
            type: [{
                _skuId: mongoose.Schema.Types.ObjectId,
                _productId: mongoose.Schema.Types.ObjectId,
                quantity: Number,
                discount: Number,
                tax: Number,
                shipping: Number,
            }], required: true, default: []
        },
    },
    { timestamps: true }
);

const Carts = mongoose.model('Carts', CartSchema);

module.exports = {
    CartSchema,
    Carts,
}