const { schemaComposer } = require('graphql-compose');

const { AuthQuery, AuthMutations } = require("./resolvers/auth.resolver");
const { RegistrationQuery, RegistrationMutations } = require("./resolvers/register.resolver");
const { UserQuery, UserMutations } = require("./resolvers/user.resolver");

schemaComposer.Query.addFields({
    ...AuthQuery,
    ...RegistrationQuery,
    ...UserQuery,
});

schemaComposer.Mutation.addFields({
    ...AuthMutations,
    ...RegistrationMutations,
    ...UserMutations,
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;