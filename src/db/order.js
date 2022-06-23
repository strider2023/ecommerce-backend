const mongoose = require('mongoose');
const { AddressSchema } = require('./address');

const OrderSchema = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        orderId: { type: String, required: true, default: '' },
        paymentId: { type: String, default: '' },
        paymentStatus: { type: String, default: '' },
        orderStatus: {
            type: String,
            enum: ['order_placed', 'processing', 'complete'],
            required: true,
            default: 'order_placed'
        },
        currency: {
            type: String,
            enum: ['usd', 'inr', 'eur'],
            required: true,
            default: 'usd'
        },
        totalCost: { type: Number, default: 0 },
        shippingTo: { type: AddressSchema, required: true },
        items: {
            type: [{
                _skuId: mongoose.Schema.Types.ObjectId,
                _productId: mongoose.Schema.Types.ObjectId,
                quantity: Number,
                price: Number,
                discount: Number,
                preTaxTotal: Number,
                tax: Number,
                shipping: Number,
                total: Number,
                status: {
                    type: String,
                    enum: ['order_received', 'processing', 'shipped', 'in_transit', 'delivered', 'cencelled', 'delivery_failed', 'returned', 'refunded'],
                    required: true,
                    default: 'order_received'
                }
            }], required: true, default: [], index: false
        },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
            required: true,
            default: 'active'
        },
    },
    { timestamps: true }
);

const Orders = mongoose.model('Orders', OrderSchema);

module.exports = {
    OrderSchema: OrderSchema,
    Orders: Orders,
}