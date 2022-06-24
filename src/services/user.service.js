const { User } = require('../db/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const me = async (_, {}, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    return JSON.parse(JSON.stringify(userDB));
}


const updatePassword = async (_, { oldPassword, newPassword }, { user }) => {
    // console.log({ user, oldPassword, newPassword })
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    const userData = JSON.parse(JSON.stringify(userDB));
    const isValid = await bcrypt.compare(oldPassword, userData.password);
    if (!isValid) {
        throw new Error(`The old password does not match our record.`);
    }
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    const updatePassword = await User.findByIdAndUpdate(user._id, { password: passwordHash });
    if (!updatePassword) {
        throw new Error(`Could not update password.`);
    }
    return { msg: "Success", code: 200 };
}

const addToBookmarks = async (_, {}, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    return JSON.parse(JSON.stringify(userDB));
}

const removeFromBookmarks = async (_, {}, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    return JSON.parse(JSON.stringify(userDB));
}

module.exports = { me, updatePassword, removeFromBookmarks, addToBookmarks };