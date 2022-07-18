const { ProductsTC } = require('../db/product');
const { GenericTC } = require("../types/generic.type");

const ProductQuery = {
    productFindById: ProductsTC.mongooseResolvers.findById(),
    productsList: ProductsTC.mongooseResolvers.pagination()
}

const ProductMutations = {
    createProduct: ProductsTC.mongooseResolvers.createOne(),
    updateProductById: ProductsTC.mongooseResolvers.updateById(),
};

module.exports = { ProductQuery, ProductMutations };