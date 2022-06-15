const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const AddressSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        addressType: String,
        isPrimary: { type: Boolean, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        landmark: String,
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: Number, required: true },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Address = mongoose.model('Address', AddressSchema);

const customizationOptions = {}; // left it empty for simplicity, described below
const AddressTC = composeMongoose(Address, customizationOptions);

module.exports = {
    AddressSchema: AddressSchema,
    Address: Address,
    AddressTC: AddressTC,
}