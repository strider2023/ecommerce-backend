const UserService = require("../services/user.service");
const { GenericTC } = require("../types/generic.type");
const { UserTC } = require('../db/user');

const UserQuery = {
    me:  {
        type: UserTC,
        resolve: UserService.me
    }
}

const UserMutations = {
    updatePassword: {
        type: GenericTC,
        args: {
            oldPassword: 'String!',
            newPassword: 'String!'
        },
        resolve: UserService.updatePassword,
    },
    updateUser: UserTC.mongooseResolvers.updateById(),
};

module.exports = { UserQuery, UserMutations };