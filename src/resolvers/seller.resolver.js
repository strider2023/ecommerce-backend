const SellerService = require("../services/seller.service");
const { GenericTC } = require("../types/generic.type");
const { SellerTC } = require('../db/seller');

const SellerQuery = {
    seller:  {
        type: SellerTC,
        resolve: SellerService.me
    }
}

const SellerMutations = {
    updateSellerPassword: {
        type: GenericTC,
        args: {
            oldPassword: 'String!',
            newPassword: 'String!'
        },
        resolve: SellerService.updateSellerPassword,
    },
    updateSellerInfo: SellerTC.mongooseResolvers.updateById(),
};

module.exports = { SellerQuery, SellerMutations };