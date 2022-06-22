const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const MetadataSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, default: '' },
        name: { type: String, required: true, default: '' },
        description: { type: String, default: '' },
        key: { type: String, default: '' },
        image: { type: Number, default: -1 },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Metadata = mongoose.model('Metadata', MetadataSchema);
const customizationOptions = { removeFields: ['createdAt', 'updatedAt'] };
const MetadataTC = composeMongoose(Metadata, customizationOptions);

module.exports = {
    MetadataSchema,
    Metadata,
    MetadataTC
}