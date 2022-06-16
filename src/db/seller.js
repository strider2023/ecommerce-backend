const mongoose = require('mongoose');
const { AddressSchema } = require('./address');

const SellerSchema = new mongoose.Schema(
    {
        sellerUserIds: { 
            type: [{ 
                _userId: mongoose.Schema.Types.ObjectId, 
                email: String,
                phone: String,
                isContactPerson: Boolean,
                canEdit: Boolean
            }], 
            required: true 
        },
        name: { type: String, required: true, default: '' },
        ownerName: { type: String, required: true, default: '' },
        about: { type: String, default: '' },
        phone: { type: String, required: true, default: '' },
        email: { type: String, required: true, default: '' },
        businessType: {
            type: [String],
            enum: ['pvt', 'proprietorship', 'public', 'others'],
            required: true,
            default: ['pvt']
        },
        logo: { type: Number, default: -1 },
        website: { type: String, required: true },
        social: { type: Map, of: mongoose.Schema.Types.String, default: {} },
        address: { type: AddressSchema, required: true, default: '' },
        pan: { type: String, default: '' },
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
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
        },
    },
    { timestamps: true }
);

const Sellers = mongoose.model('Sellers', SellerSchema);

module.exports = {
    SellerSchema: SellerSchema,
    Sellers: Sellers,
}