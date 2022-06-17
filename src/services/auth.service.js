const { authenticate } = require('../utils/auth.util');
const { User } = require('../db/user');
const { UserSession } = require('../db/session');
const bcrypt = require('bcrypt');
// var serviceAccount = require("../firebaseService.json");
// var admin = require("firebase-admin");
// var defaultApp = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

const login = async (_, { email, phone, password }) => {
    let request = { status: "active" };
    if (email) {
        request['email'] = email;
    }
    if (phone) {
        request['phone'] = phone;
    }
    // console.log(request);
    const user = await User.findOne({ ...request }).exec();
    if (!user) {
        throw new Error(`Invalid user.`);
    }
    const userData = JSON.parse(JSON.stringify(user));
    const passwordValid = await bcrypt.compare(password, userData.password);
    if (!passwordValid) {
        throw new Error(`Invalid password.`);
    }
    const token = await authenticate(user._id);
    return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        email: userData.email,
        phone: userData.phone,
        name: userData.name,
        username: userData.username,
        role: userData.role,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
        avatar: userData.avatar,
        metadata: userData.metadata
    };
}

const refreshToken = async (_, { refreshToken }) => {
    let request = { refreshToken, status: "active" };
    const session = await UserSession.findOne({ ...request }).exec();
    if (!session) {
        throw new Error(`Invalid user session`);
    }
    const sessionData = JSON.parse(JSON.stringify(session));
    const token = await authenticate(sessionData._userId);
    return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
    };
}

const logout = async (_, { refreshToken }) => {
    let request = { refreshToken, status: "active" };
    const session = await UserSession.deleteOne({ ...request }).exec();
    if (!session) {
        throw new Error(`Invalid user session`);
    }
    return { msg: "Success", code: 200 };
}

const resetPassword = async (_, { email }) => {
    let request = { email: email };
    if (!response) {
        throw new Error(`Invalid email.`);
    }
    return { msg: "Success" };
}

const sendOtp = async (_, { phone }) => {
    const response = await axios.get(`https://2factor.in/API/V1/${process.env.SMSAPIKEY}/SMS/${phone}/AUTOGEN`);
    console.log(response.data);
    if (!response) {
        throw new Error(`Error while generating otp.`);
    }
    return { msg: "Success", sessionId: response.data.Details };
}

const verifyOtp = async (_, { phone, sessionId, otp }) => {
    const response = await axios.get(`https://2factor.in/API/V1/${process.env.SMSAPIKEY}/SMS/VERIFY/${sessionId}/${otp}`);
    console.log(response.data);
    if (!response) {
        throw new Error(`Invalid otp verification details.`);
    }
    if (response.data.Status !== 'Success') {
        throw new Error(`Invalid otp.`);
    }
    const query = 'SELECT u.id, u.email FROM public.directus_users AS u WHERE u.phone=$1;';
    const user = await db.query(query, [phone]);
    const userEmail = user.rows[0].email;
    const { accessToken, refreshToken } = await authUtil.authenticate(userEmail);
    return await getUserDetails(accessToken, refreshToken);
}

const ssoLogin = async (_, { email, ssoToken, sso }) => {
    const query = 'SELECT u.id, u.role FROM public.directus_users AS u WHERE u.email=$1;';
    const user = await db.query(query, [email]);
    if (user.rows.length === 0) {
        throw new Error(`User with the given email id does not exists. Please register first.`);
    }
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

module.exports = { login, refreshToken, logout, resetPassword, sendOtp, verifyOtp, ssoLogin };