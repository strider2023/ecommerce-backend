const mongoose = require('mongoose');
const { Address } = require('./address');

const OrderSchema = new mongoose.Schema(
    {
        customerId: { type: String, default: '' },
        paymentId: { type: String, default: '' },
        paymentStatus: { type: String, default: '' },
        orderStatus: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
        currency: { type: String, default: '' },
        totalCost: { type: String, default: '' },
        shippingTo: { type: Address, required: true },
        items: {
            type: [{
                sku: String,
                quantity: Number,
                price: Number,
                discount: Number,
                preTaxTotal: Number,
                tax: Number,
                shipping: Number,
                total: Number,
            }], required: []
        },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Orders = mongoose.model('Orders', OrderSchema);

module.exports = {
    OrderSchema: OrderSchema,
    Orders: Orders,
}