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
            user_access: userData.role.indexOf('user') > -1 ? true : false,
            admin_access: userData.role.indexOf('admin') > -1 ? true : false,
            seller_access: userData.role.indexOf('seller') > -1 ? true : false,
            influencer_access: userData.role.indexOf('influencer') > -1 ? true : false,
            stylist_access: userData.role.indexOf('stylist') > -1 ? true : false
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