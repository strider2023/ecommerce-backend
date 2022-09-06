const { authenticate, generateOtp } = require('../utils/auth.util');
const { User } = require('../db/user');
const { UserSession } = require('../db/session');
const { Otp } = require('../db/otp');
const { RESET_PASSWORD, EMAIL_OTP } = require('../notifications/templates/auth.templates');
const notification = require('../notifications');

const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');
const saltRounds = 10;

const login = async (_, { email, phone, password }) => {
    const { user, userData } = await getUser({email, phone});
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

const recoverPassword = async (_, { email, phone }) => {
    const { userData } = await getUser({email, phone});
    const recoveryObj = {
        resetUUID: uuid(),
        expires: new Date(new Date().setDate(new Date().getDate() + 2)),
        isActive: true
    }
    const updateResetLink = await User.findByIdAndUpdate(userData._id, { $push: { resetPassword: recoveryObj } });
    if (!updateResetLink) {
        throw new Error(`Could not generate password recovery link.`);
    }
    await notification.sendMail({ from: "from@domain.com", to: userData.email, template: RESET_PASSWORD({ link: `https://www.google.co.in?recoveryId=${recoveryObj.resetUUID}`, name: userData.name }) });
    return { msg: "Password link sent to registered email.", code: 200 };
}

const resetPassword = async (_, { resetId, password }) => {
    const user = await User.findOne({ 'local.resetPassword': { $elemMatch: { resetUUID: resetId } } }).exec();
    if (!user) {
        throw new Error(`Invalid reset password request.`);
    }
    const userData = JSON.parse(JSON.stringify(user));
    let resetLinkDetails = null;
    for (const resetData of userData.resetPassword) {
        if (resetData.resetUUID === resetId) {
            resetLinkDetails = resetData;
            break;
        }
    }
    // console.log(resetLinkDetails)
    if (!resetLinkDetails) {
        throw new Error(`Invalid reset password request.`);
    }
    if (!resetLinkDetails.isActive) {
        throw new Error(`Recover password request no longer valid`);
    }
    if (new Date(resetLinkDetails.expires).getTime() < new Date().getTime()) {
        throw new Error(`Recover password request has expired please generate a new link.`);
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const updatePassword = await User.findByIdAndUpdate(userData._id, { password: passwordHash });
    if (!updatePassword) {
        throw new Error(`Could not update password.`);
    }
    // Mark reset id as used
    const updateResetPassword = await User.updateOne({ _id: userData._id, "resetPassword.resetUUID": resetId }, {
        $set: {
            "resetPassword.$.isActive": false
        }
    });
    if (!updateResetPassword) {
        console.error("Error while updating flag.");
    }
    return { msg: "Password successfully updated.", code: 200 };
}

const sendOtp = async (_, { email, phone }) => {
    const { user, userData } = await getUser({email, phone});
    // Remove old otps if any
    await Otp.deleteMany({ expires: { $lte: new Date() } });
    const generatedOtp = await generateOtp();
    // Expires in 30 mins
    const otpExpiration = new Date(new Date().setMinutes(new Date().getMinutes() + 30));
    const otp = new Otp({ _userId: user._id, otp: generatedOtp, expires: otpExpiration, status: "active" });
    await otp.save();
    if (!otp) {
        throw new Error(`An error occured while generating OTP. Please try again.`);
    }
    await notification.sendMail({ from: "from@domain.com", to: userData.email, template: EMAIL_OTP({ otp: generatedOtp, name: userData.name }) });
    return { msg: "Otp sent to registered email and phone.", code: 200 };
}

const verifyOtp = async (_, { email, phone, otp }) => {
    const { user, userData } = await getUser({email, phone});
    await Otp.deleteMany({ expires: { $lte: new Date() } });
    // TODO: expires: { $lte: new Date() } Not sure why this is not working
    const validOtp = await Otp.findOne({ _userId: user._id, otp: otp, status: "active" }).exec();
    if (!validOtp) {
        throw new Error(`Otp entered is invalid.`);
    }
    const otpData = JSON.parse(JSON.stringify(validOtp));
    if (new Date(otpData.expires) < new Date()) {
        throw new Error(`Otp entered has expired.`);
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

const ssoLogin = async (_, { email, ssoToken, sso }) => {
    let request = { email, status: "active" };
    const user = await User.findOne({ ...request }).exec();
    const userData = JSON.parse(JSON.stringify(user));
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

const getUser = async ({ email, phone }) => {
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
    return { user, userData };
}

module.exports = { login, refreshToken, logout, recoverPassword, resetPassword, sendOtp, verifyOtp, ssoLogin };