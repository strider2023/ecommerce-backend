const mongoose = require('mongoose');
const { ProductSKUSchema } = require('./productSKU');

const ProductSchema = new mongoose.Schema(
    {
        _sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        tags: { type: [String], default: [] },
        categories: {
            type: [mongoose.Schema.Types.ObjectId], required: true
        },
        skus: { type: [ProductSKUSchema], required: true },
        rating: { type: Number, default: 0 },
        comments: {
            type: [{
                _userId: mongoose.Schema.Types.ObjectId,
                name: String,
                rating: Number,
                comment: String,
                date: { type: Date, default: new Date() }
            }],
            default: []
        },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Products = mongoose.model('Products', ProductSchema);

module.exports = {
    ProductSchema: ProductSchema,
    Products: Products,
}