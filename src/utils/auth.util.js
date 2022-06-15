const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const { User } = require('../db/user');
const { UserSession } = require('../db/session');

const authenticate = async (id) => {
    try {
        const user = await User.findById(id, "email, name, role").exec();
        const userData = JSON.parse(JSON.stringify(user));
        // console.log(userData._id);
        const customClaims = {
            ...userData,
            app_access: userData.role.includes("user") === -1 ? false : true,
            admin_access: userData.role.includes("admin") === -1 ? false : true
        }
        const accessToken = jwt.sign(customClaims, process.env.SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_TTL,
            issuer: process.env.APP_NAME,
        });
        // console.log(userData, customClaims, accessToken);

        const refreshToken = nanoid(64);
        const refreshTokenExpiration = new Date(new Date().setDate(new Date().getDate() + 7));

        // console.log(refreshToken, refreshTokenExpiration.toUTCString());
        const session = new UserSession({
            refreshToken: refreshToken,
            _userId: user._id,
            expires: refreshTokenExpiration
        });
        await session.save();

        //Delete old sessions
        await UserSession.deleteMany({ expires: { $lte: new Date() } });
        return { accessToken: accessToken, refreshToken: refreshToken };
    } catch (err) {
        console.log(err.message)
        return {};
    }
}

module.exports = { authenticate };