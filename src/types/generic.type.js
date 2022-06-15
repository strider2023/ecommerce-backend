const { schemaComposer } = require('graphql-compose');

const GenericTC = schemaComposer.createObjectTC({
    name: 'Generic',
    fields: {
        msg: 'String',
        code: 'Int'
    },
});

module.exports = { GenericTC };