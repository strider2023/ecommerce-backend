const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');

const BookmarkSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, required: true, default: '' },
        bookmarkCollectionName: { type: String, required: true, default: '' },
        items: {
            type: [{
                _skuId: mongoose.Schema.Types.ObjectId,
                name: String,
                image: {type: Number, default: -1},
                _productId: mongoose.Schema.Types.ObjectId
            }], required: true, default: []
        },
    },
    { timestamps: true }
);

const Bookmarks = mongoose.model('Bookmarks', BookmarkSchema);
const customizationOptions = { removeFields: ['createdAt', 'updatedAt'] };
const BookmarksTC = composeMongoose(Bookmarks, customizationOptions);

module.exports = {
    BookmarkSchema,
    Bookmarks,
    BookmarksTC
}