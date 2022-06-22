const { Sellers } = require('../db/seller');

const me = async (_, {}, { user }) => {
    const sellerDB = await Sellers.findOne({_userId : user._id}).exec();
    if (!sellerDB) {
        throw new Error(`User not found.`);
    }
    return JSON.parse(JSON.stringify(sellerDB));
}

module.exports = { me };