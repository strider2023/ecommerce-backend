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
    if (role === 'seller') {
        throw new Error(`Please user registerSeller to create a seller account.`);
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

const registerSeller = async (_, { email, phone, password, orgName, name, website, businessType, govtRegistrationNumber, tax }) => {
    const sellers = await Sellers.findOne({ email }, "ownerName");
    if (sellers) {
        throw new Error(`Seller already exists.`);
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, phone, password: passwordHash, name, username: orgName, role: "seller", status: "inactive" });
    await user.save();
    if (!user.id) {
        throw new Error(`Unable to create seller account.`);
    }
    const seller = new Sellers({ _userId: user.id, orgName, website, businessType, govtRegistrationNumber, tax });
    await seller.save();
    if (!seller.id) {
        throw new Error(`Unable to create seller account.`);
    }
    return { msg: "Success. Please wait for activation.", code: 200 };
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

const changeUserStatus = async (_, { sellerId, status }, { user }) => {
    // Check if admin
    if (!user.admin_access) {
        throw new Error(`You do not have permissions make any changes.`);
    }
    const updateState = await User.findByIdAndUpdate(sellerId, { status });
    if (!updateState) {
        throw new Error(`Could not change user state.`);
    }
    return { msg: "Success", code: 200 };
}

module.exports = { isRegistered, register, ssoRegister, registerSeller, changeUserStatus };