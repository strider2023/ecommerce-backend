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
    updateSellerInfo: {
        type: GenericTC,
    }
};

module.exports = { SellerQuery, SellerMutations };