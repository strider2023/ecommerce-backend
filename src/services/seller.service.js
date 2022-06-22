const { Sellers } = require('../db/seller');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const me = async (_, {}, { user }) => {
    const sellerDB = await Sellers.findById(user._id).exec();
    if (!sellerDB) {
        throw new Error(`User not found.`);
    }
    return JSON.parse(JSON.stringify(sellerDB));
}

const updateSellerPassword = async (_, { oldPassword, newPassword }, { user }) => {
    // console.log({ user, oldPassword, newPassword })
    const sellerDB = await Sellers.findById(user._id).exec();
    if (!sellerDB) {
        throw new Error(`Seller not found.`);
    }
    const sellerData = JSON.parse(JSON.stringify(sellerDB));
    const isValid = await bcrypt.compare(oldPassword, sellerData.password);
    if (!isValid) {
        throw new Error(`The old password does not match our record.`);
    }
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    const updatePassword = await Sellers.findByIdAndUpdate(user._id, { password: passwordHash });
    if (!updatePassword) {
        throw new Error(`Could not update password.`);
    }
    return { msg: "Success", code: 200 };
}

module.exports = { me, updateSellerPassword };