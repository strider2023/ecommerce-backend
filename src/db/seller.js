const mongoose = require('mongoose');
const { AddressSchema } = require('./address');
const { composeMongoose } = require('graphql-compose-mongoose');

const SellerSchema = new mongoose.Schema(
    {
        orgName: { type: String, required: true, default: '' },
        ownerName: { type: String, required: true, default: '' },
        role: { type: String, default: 'seller' },
        about: { type: String, default: '' },
        phone: { type: String, required: true, default: '' },
        email: { type: String, required: true, default: '' },
        password: { type: String, required: true },
        dateOfEstablishment: { type: Date, default: new Date() },
        businessType: {
            type: [String],
            enum: ['pvt', 'proprietorship', 'public', 'others'],
            required: true,
            default: ['pvt']
        },
        logo: { type: Number, default: -1 },
        website: { type: String, required: true },
        social: { type: Map, of: mongoose.Schema.Types.String, default: {} },
        primaryAddress: { type: AddressSchema, required: true, default: '' },
        addresses: { type: [AddressSchema], default: [], index: false },
        govtRegistrationNumber: { type: String, default: '' },
        tax: { type: String, default: '' },
        accountName: { type: String, default: '' },
        accountNumber: { type: String, default: '' },
        accountType: {
            type: [String],
            enum: ['savings', 'current'],
            default: ['savings']
        },
        ifsc: { type: String, default: '' },
        branchName: { type: String, default: '' },
        policies: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
        courierCompanyName: { type: String, default: '' },
        commissions: {
            type: [{
                category: String,
                percentage: Number,
            }],
            required: true
        },
        metadata: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Sellers = mongoose.model('Sellers', SellerSchema);

const customizationOptions = {};
const SellerTC = composeMongoose(Sellers, customizationOptions);

module.exports = { SellerSchema, Sellers, SellerTC }