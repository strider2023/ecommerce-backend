const { schemaComposer } = require('graphql-compose');

const { AuthQuery, AuthMutations } = require("./resolvers/auth.resolver");
const { RegistrationQuery, RegistrationMutations } = require("./resolvers/register.resolver");
const { UserQuery, UserMutations } = require("./resolvers/user.resolver");
const { SellerQuery, SellerMutations } = require("./resolvers/seller.resolver");
const { MetadataQuery, MetadataMutations } = require("./resolvers/metadata.resolver");

schemaComposer.Query.addFields({
    ...AuthQuery,
    ...RegistrationQuery,
    ...UserQuery,
    ...SellerQuery,
    ...MetadataQuery,
});

schemaComposer.Mutation.addFields({
    ...AuthMutations,
    ...RegistrationMutations,
    ...UserMutations,
    ...SellerMutations,
    ...MetadataMutations,
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;