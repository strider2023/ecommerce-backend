const { schemaComposer } = require('graphql-compose');

const AuthTC = schemaComposer.createObjectTC({
    name: 'Auth',
    fields: {
        accessToken: 'String',
        refreshToken: 'String',
        email: 'String',
        phone: 'String',
        name: 'String',
        username: 'String',
        role: '[String]',
        gender: 'String',
        dateOfBirth: 'Date',
        avatar: 'Int',
        metadata: 'JSON'
    },
});

module.exports = { AuthTC };
