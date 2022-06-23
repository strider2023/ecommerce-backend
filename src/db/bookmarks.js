const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
    {
        _userId: { type: mongoose.Schema.Types.ObjectId, default: '' },
        items: {
            type: [{
                _skuId: mongoose.Schema.Types.ObjectId,
                name: String,
                _productId: mongoose.Schema.Types.ObjectId
            }], required: true, default: []
        },
    },
    { timestamps: true }
);

const Bookmarks = mongoose.model('Bookmarks', BookmarkSchema);

module.exports = {
    BookmarkSchema,
    Bookmarks,
}