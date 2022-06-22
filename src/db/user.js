const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');
const { AddressSchema } = require('./address');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, default: '' },
        username: { type: String, trim: true, toLowerCase: true, default: '' },
        role: {
            type: [String],
            enum: ['admin', 'stylist', 'user', 'influencer', 'seller'],
            required: true,
            default: ['user']
        },
        email: { type: String, required: true, unique: true },
        phone: { type: String, unique: true, default: '' },
        password: { type: String, required: true },
        gender: {
            type: String,
            enum: ['na', 'male', 'female', 'others'],
            default: 'na'
        },
        dateOfBirth: { type: Date, default: new Date() },
        avatar: { type: Number, default: -1 },
        metadata: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
        addresses: { type: [AddressSchema], default: [], index: false },
        status: {
            type: String,
            enum: ['active', 'archived', 'inactive'],
            required: true,
            default: 'active'
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

const customizationOptions = { removeFields: ['status', 'createdAt', 'updatedAt', '_id', 'role', 'password'] };
const UserTC = composeMongoose(User, customizationOptions);

module.exports = { User, UserSchema, UserTC }