const { AuthTC } = require("../types/auth.type");
const { GenericTC } = require("../types/generic.type");
const RegisterationService = require("../services/register.service");

const RegistrationQuery = {
    isRegistered: {
        type: GenericTC,
        args: {
            email: 'String',
            phone: 'String'
        },
        resolve: RegisterationService.isRegistered,
    }
}

const RegistrationMutations = {
    register: {
        type: AuthTC,
        args: {
            email: 'String!',
            phone: 'String!',
            password: 'String!',
            name: 'String!',
            role: 'String!',
            username: 'String',
            gender: 'String',
            dateOfBirth: 'Date',
            avatar: 'Int',
            metadata: 'JSON'
        },
        resolve: RegisterationService.register,
    },
    ssoRegister: {
        type: AuthTC,
        args: {
            email: 'String!',
            role: 'String!',
            ssoToken: 'String!',
            sso: {
                type: 'String!',
                description: "Please use google or apple as enums."
            }
        },
        resolve: RegisterationService.ssoRegister,
    },
    registerSeller: {
        type: GenericTC,
        args: {
            email: 'String!',
            phone: 'String!',
            password: 'String!',
            orgName: 'String!',
            name: 'String!',
            website: 'String!',
            businessType: 'String!',
            govtRegistrationNumber: 'String!',
            tax: 'String!'
        },
        resolve: RegisterationService.registerSeller,
    },
    changeUserStatus: {
        type: GenericTC,
        args: {
            sellerId: 'ID!',
            status: 'String!'
        },
        resolve: RegisterationService.changeUserStatus,
    }
};

module.exports = { RegistrationQuery, RegistrationMutations };