const mongoose = require('mongoose');

const ProductSKUSchema = new mongoose.Schema(
    {
        sku: { type: Stirng, required: true, unique: true },
        price: { type: { base: String, currency: String }, required: true },
        quantity: { type: Number, required: true },
        weight: { type: Number, required: true },
        assets: { type: [Number], required: true },
        discount: { type: Number, default: 0 },
        tags: { type: [String], default: [] },
        metadata: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const SKU = mongoose.model('SKU', ProductSKUSchema);

module.exports = {
    ProductSKUSchema: ProductSKUSchema,
    SKU: SKU,
}