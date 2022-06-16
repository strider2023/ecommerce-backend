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
    console.log({ user, oldPassword, newPassword })
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    // const user = new User({ email, phone, password: passwordHash, name, username, role, gender, dateOfBirth, avatar, metadata });
    // await user.save();
    // if (!user.id) {
    //     throw new Error(`Unable to create user.`);
    // }
    // const token = await authenticate(user._id);
    return { msg: "Success", code: 200 };
}

module.exports = { me, updatePassword };