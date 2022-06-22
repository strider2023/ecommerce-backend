const { authenticate } = require('../utils/auth.util');
const { User } = require('../db/user');
const { Sellers } = require('../db/seller');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const isRegistered = async (_, { email, phone }) => {
    // If email or phone is not present
    if (!phone && !email) {
        throw new Error(`You need email or phone to verfiy is user is present in the system..`);
    }
    let request = {};
    // If email present
    if (email) {
        request['email'] = email;
    }
    if (phone) {
        request['phone'] = phone;
    }
    const user = await User.findOne({ ...request }).exec();
    if (!user) {
        throw new Error(`User not found.`);
    }
    return { msg: "Success", code: 200 };
}

const register = async (_, { email, phone, password, name, username, role, gender, dateOfBirth, avatar, metadata }) => {
    if (role === 'admin') {
        throw new Error(`You do not have the permission to create an ADMIN user.`);
    }
    const users = await User.findOne({ email }, "name");
    if (users) {
        throw new Error(`User already exists.`);
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, phone, password: passwordHash, name, username, role, gender, dateOfBirth, avatar, metadata });
    await user.save();
    if (!user.id) {
        throw new Error(`Unable to create user.`);
    }
    const token = await authenticate(user._id);
    return { accessToken: token.accessToken, refreshToken: token.refreshToken, email, phone, name, username, role, gender, dateOfBirth, avatar, metadata };
}

const registerSupplier = async (_, { email, phone, password, orgName, ownerName, website, dateOfEstablishment, govtRegistrationNumber, tax }) => {
    const sellers = await Sellers.findOne({ email }, "ownerName");
    if (sellers) {
        throw new Error(`Seller already exists.`);
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const seller = new Sellers({ email, phone, password: passwordHash, orgName, ownerName, website, dateOfEstablishment, govtRegistrationNumber, tax, status: "inactive" });
    await seller.save();
    if (!seller.id) {
        throw new Error(`Unable to create seller.`);
    }
    // Todo Add Brand Information
    return { msg: "Success", code: 200 };
}

const ssoRegister = async (_, { email, role, ssoToken, sso }) => {
    if (sso !== 'google' || sso !== 'apple') {
        throw new Error(`Invalid sso type. Please use google or apple.`);
    }
    if (sso === 'google') {
        const verifyUser = await admin.auth().verifyIdToken(ssoToken);
        console.log("verifyUser", verifyUser);
        if (verifyUser && verifyUser.email != email) {
            throw new Error(`SSO signature does not match with the email id provided.`);
        }
    }
    const { accessToken, refreshToken } = await authUtil.authenticate(email);
    return await getUserDetails(accessToken, refreshToken);
}

module.exports = { isRegistered, register, ssoRegister, registerSupplier };