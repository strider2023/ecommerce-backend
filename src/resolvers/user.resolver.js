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
    createNewBookmark: {
        type: GenericTC,
        args: {
            bookmarkCollectionName: 'String!',
            skuId: 'ID!',
            productId: 'ID!',
            name: 'String!',
            image: 'Int'
        },
        resolve: UserService.createNewBookmark,
    },
    updateBookmarkCollectionName: {
        type: GenericTC,
        args: {
            bookmarkCollectionName: 'String!',
            bookmarkId: 'ID!',
        },
        resolve: UserService.updateBookmarkCollectionName,
    },
    updateBookmarks: {
        type: GenericTC,
        args: {
            isDelete: 'Boolean!',
            bookmarkId:  'ID!',
            skuId: 'ID!',
            productId: 'ID!',
            name: 'String',
            image: 'Int'
        },
        resolve: UserService.updateBookmarks,
    },
    removeBookmarksCollection: {
        type: GenericTC,
        args: {
            bookmarkId:  'ID!'
        },
        resolve: UserService.removeBookmarksCollection,
    },
};

module.exports = { UserQuery, UserMutations };