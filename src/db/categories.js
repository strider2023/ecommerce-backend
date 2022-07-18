const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const CategoriesSchema = new mongoose.Schema(
    {
        categoryId: { type: String, required: true, default: '' },
        parentName: { type: String, required: true, default: '' },
        parentId: { type: String, required: true, default: '' },
        categoryName: { type: String, required: true, default: '' },
        description: { type: String, default: '' },
        image: { type: Number, default: -1 },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Categories = mongoose.model('Categories', CategoriesSchema);
const customizationOptions = { removeFields: ['createdAt', 'updatedAt'] };
const CategoriesTC = composeMongoose(Categories, customizationOptions);

module.exports = {
    CategoriesSchema,
    Categories,
    CategoriesTC
}