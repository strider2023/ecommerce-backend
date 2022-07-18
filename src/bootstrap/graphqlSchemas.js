const { schemaComposer } = require('graphql-compose');

const { AuthQuery, AuthMutations } = require("../resolvers/auth.resolver");
const { RegistrationQuery, RegistrationMutations } = require("../resolvers/register.resolver");
const { UserQuery, UserMutations } = require("../resolvers/user.resolver");
const { SellerQuery, SellerMutations } = require("../resolvers/seller.resolver");
const { MetadataQuery, MetadataMutations } = require("../resolvers/metadata.resolver");
const { ProductQuery, ProductMutations } = require("../resolvers/product.resolver");

schemaComposer.Query.addFields({
    ...AuthQuery,
    ...RegistrationQuery,
    ...UserQuery,
    ...SellerQuery,
    ...MetadataQuery,
    ...ProductQuery,
});

schemaComposer.Mutation.addFields({
    ...AuthMutations,
    ...RegistrationMutations,
    ...UserMutations,
    ...SellerMutations,
    ...MetadataMutations,
    ...ProductMutations,
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;