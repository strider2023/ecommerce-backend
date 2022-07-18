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
    updateSellerInfo: SellerTC.mongooseResolvers.updateOne()
};

module.exports = { SellerQuery, SellerMutations };