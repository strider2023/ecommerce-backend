const { schemaComposer } = require('graphql-compose');

const { AuthQuery, AuthMutations } = require("./resolvers/auth.resolver");
const { RegistrationQuery, RegistrationMutations } = require("./resolvers/register.resolver");

schemaComposer.Query.addFields({
    ...AuthQuery,
    ...RegistrationQuery,
});

schemaComposer.Mutation.addFields({
    ...AuthMutations,
    ...RegistrationMutations,
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;