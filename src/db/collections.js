const mongoose = require('mongoose');

const CollectionsSchema = new mongoose.Schema(
    {
        _influencerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true, default: '' },
        description: { type: String, required: true, default: '' },
        assetId: { type: Number, default: -1 },
        type: {
            type: String,
            enum: ['video', 'image', 'collection'],
            default: 'image',
            required: true
        },
        fitTypes: { type: [mongoose.Schema.Types.ObjectId], default: []},
        bodyTypes: { type: [mongoose.Schema.Types.ObjectId], default: []},
        occasions: { type: [mongoose.Schema.Types.ObjectId], default: []},
        personalStyles: { type: [mongoose.Schema.Types.ObjectId], default: []},
        products: {
            type: [{
                _productId: mongoose.Schema.Types.ObjectId,
                _productSKUId: mongoose.Schema.Types.ObjectId,
                image: Number,
                date: { type: Date, default: new Date() }
            }],
            default: [],
            required: true
        },
        likes: { type: Number, default: 0 },
        comments: {
            type: [{
                _userId: mongoose.Schema.Types.ObjectId,
                name: String,
                comment: String,
                date: { type: Date, default: new Date() }
            }],
            default: []
        },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Collections = mongoose.model('Collections', CollectionsSchema);

module.exports = {
    CollectionsSchema,
    Collections,
}