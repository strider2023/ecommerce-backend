const { User } = require("../db/user");
const bcrypt = require("bcrypt");

const createAdminUser = async () => {
    try {
        const oldUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (oldUser) {
            console.info("Admin account exist.");
        } else {
            const encryptedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            const request = {
                name: 'System Admin',
                username: 'Admin',
                email: process.env.ADMIN_EMAIL,
                phone: "",
                password: encryptedPassword,
                role: ['admin'],
            }
            const user = await User.create(request);
            console.info("Admin User created " + user._id);
        }
    } catch (e) {
        console.error(e);
        console.error("Unable to validate admin account");
    }
}

module.exports = { createAdminUser }