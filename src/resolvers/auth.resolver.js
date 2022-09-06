const { AuthTC } = require("../types/auth.type");
const AuthService = require("../services/auth.service");
const { GenericTC } = require("../types/generic.type");
const { OtpTC } = require("../types/otp.type");

const AuthQuery = {
    auth: {
        type: AuthTC,
        resolve: () => { return {} },
    }
}

const AuthMutations = {
    login: {
        type: AuthTC,
        args: {
            email: 'String',
            phone: 'String',
            password: 'String'
        },
        resolve: AuthService.login,
    },
    refreshToken: {
        type: AuthTC,
        args: {
            refreshToken: 'String!'
        },
        resolve: AuthService.refreshToken,
    },
    logout: {
        type: GenericTC,
        args: {
            refreshToken: 'String!'
        },
        resolve: AuthService.logout,
    },
    recoverPassword: {
        type: GenericTC,
        args: {
            email: 'String',
            phone: 'String',
        },
        resolve: AuthService.recoverPassword,
    },
    resetPassword: {
        type: GenericTC,
        args: {
            resetId: 'String!',
            password: 'String!',
        },
        resolve: AuthService.resetPassword,
    },
    sendOtp: {
        type: GenericTC,
        args: {
            email: 'String',
            phone: 'String'
        },
        resolve: AuthService.sendOtp,
    },
    verifyOtp: {
        type: AuthTC,
        args: {
            email: 'String',
            phone: 'String',
            otp: 'String!'
        },
        resolve: AuthService.verifyOtp,
    },
    ssoLogin: {
        type: AuthTC,
        args: {
            email: 'String!',
            ssoToken: 'String!',
            sso: {
                type: 'String!',
                description: "Please use google or apple as enums."
            }
        },
        resolve: AuthService.ssoLogin,
    },
};

module.exports = { AuthQuery, AuthMutations };