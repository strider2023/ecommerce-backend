const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
    {
        nickname: { type: String, default: '' },
        description: { type: String, default: '' },
        address: { type: String, required: true },
        city: { type: String, required: true },
        landmark: { type: String, default: '' },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: Number, required: true, pattern: "^[0-9]{5}(?:-[0-9]{4})?$" },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Address = mongoose.model('Address', AddressSchema);

module.exports = {
    AddressSchema: AddressSchema,
    Address: Address,
}