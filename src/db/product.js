const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        _sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        sku: { type: String, required: true },
        colours: { type: String, required: true },
        sizes: { type: String, default: '' },
        weigth: { type: String, required: true },
        cost: { type: String, required: true },
        assets: { type: Number, required: true },
        materials: { type: Number, required: true },
        tags: { type: [String], required: true },
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

// {
//     item: "journal",
//         features: ["Inner pocket", "Durable cover"],
//             skus: [{
//                 sku: "154A",
//                 price: {
//                     base: NumberDecimal(9.99),
//                     currency: "USD"
//                 },
//                 quantity: 20,
//                 options: {
//                     size: { h: 14, l: 21, w: 1 },
//                     features: ["72 sheets of premium lined paper"],
//                     colors: ["brown", "red"],
//                     ruling: "wide",
//                     image: "images/journal1.jpg"
//                 }
//             }, {
//                 sku: "154B",
//                 price: {
//                     base: NumberDecimal(14.99),
//                     currency: "USD",
//                     discount: NumberDecimal(4.00)
//                 },
//                 quantity: 15,
//                 options: {
//                     size: { h: 18, l: 22, w: 2 },
//                     features: ["140 sheets of premium paper"],
//                     colors: ["brown"],
//                     ruling: "unlined",
//                     image: "images/journals.jpg"
//                 }
//             }]
// }