const { User } = require('../db/user');
const { Bookmarks } = require('../db/bookmarks');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const me = async (_, { }, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    return JSON.parse(JSON.stringify(userDB));
}


const updatePassword = async (_, { oldPassword, newPassword }, { user }) => {
    // console.log({ user, oldPassword, newPassword })
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    const userData = JSON.parse(JSON.stringify(userDB));
    const isValid = await bcrypt.compare(oldPassword, userData.password);
    if (!isValid) {
        throw new Error(`The old password does not match our record.`);
    }
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    const updatePassword = await User.findByIdAndUpdate(user._id, { password: passwordHash });
    if (!updatePassword) {
        throw new Error(`Could not update password.`);
    }
    return { msg: "Success", code: 200 };
}

const createNewBookmark = async (_, { bookmarkCollectionName, skuId, productId, name, image }, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    const bookmark = new Bookmarks({ bookmarkCollectionName, items: [{skuId, productId, name, image}], status: "active" });
    await bookmark.save();
    if (!bookmark.id) {
        throw new Error(`Unable to create new bookmarks folder.`);
    }
    return { msg: "Success", code: 200 };
}

const updateBookmarks = async (_, { isDelete, bookmarkId, skuId, productId, name, image }, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    return { msg: "Success", code: 200 };
}

const updateBookmarkCollectionName = async (_, { bookmarkId, bookmarkCollectionName }, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    const updateBookmarks = await Bookmarks.findByIdAndUpdate(bookmarkId, { bookmarkCollectionName });
    if (!updateBookmarks) {
        throw new Error(`Could not update bookmark collection name.`);
    }
    return { msg: "Success", code: 200 };
}

const removeBookmarksCollection = async (_, { bookmarkId }, { user }) => {
    const userDB = await User.findById(user._id).exec();
    if (!userDB) {
        throw new Error(`User not found.`);
    }
    const updateBookmarks = await Bookmarks.findByIdAndDelete(bookmarkId);
    if (!updateBookmarks) {
        throw new Error(`Could not update bookmark collection name.`);
    }
    return { msg: "Success", code: 200 };
}

module.exports = { me, createNewBookmark, updatePassword, updateBookmarkCollectionName, updateBookmarks, removeBookmarksCollection };