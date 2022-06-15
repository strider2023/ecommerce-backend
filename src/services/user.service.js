const { User } = require('../db/user');

const me = async (_, {}) => {
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


const updatePassword = async (_, { oldPassword, newPassword }) => {
    if (role === 'ADMIN') {
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

module.exports = { me, updatePassword };