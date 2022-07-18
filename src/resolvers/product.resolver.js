const { ProductsTC } = require('../db/product');
const { GenericTC } = require("../types/generic.type");
const ProductsAccess = require("../access/products.access");

const ProductQuery = {
    ...ProductsAccess.checkAccess({
        productFindById: ProductsTC.mongooseResolvers.findById(),
        productsList: ProductsTC.mongooseResolvers.pagination()
    })
}

const ProductMutations = {
    ...ProductsAccess.checkAccess({
        createProduct: ProductsTC.mongooseResolvers.createOne(),
        updateProductById: ProductsTC.mongooseResolvers.updateById(),
    })
};

module.exports = { ProductQuery, ProductMutations };