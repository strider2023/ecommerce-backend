const UserService = require("../services/user.service");
const { GenericTC } = require("../types/generic.type");
const { UserTC } = require('../db/user');
const { BookmarksTC } = require('../db/bookmarks');
const BookmarksAccess = require('../access/bookmarks.access');

const UserQuery = {
    me: {
        type: UserTC,
        resolve: UserService.me
    },
    ...BookmarksAccess.checkAccess({
        myBookmarks: BookmarksTC.mongooseResolvers.pagination()
    })
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
    updateUserInfo: UserTC.mongooseResolvers.updateById(),
    addToBookmarks: {
        type: GenericTC,
        args: {
            skuId: 'ID!',
            productId: 'ID!',
            name: 'String!',
            image: 'Int'
        },
        resolve: UserService.addToBookmarks,
    },
    removeFromBookmarks: {
        type: GenericTC,
        args: {
            skuId: 'ID!',
            productId: 'ID!'
        },
        resolve: UserService.removeFromBookmarks,
    },
};

module.exports = { UserQuery, UserMutations };