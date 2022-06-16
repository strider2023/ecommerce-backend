const mongoose = require('mongoose');
const { ProductSKUSchema } = require('./productSKU');

const ProductSchema = new mongoose.Schema(
    {
        _sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        tags: { type: [String], default: [] },
        categories: {
            type: [{
                categoryId: String,
                name: String,
                parent: String,
            }], required: true
        },
        skus: { type: [ProductSKUSchema], required: true },
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