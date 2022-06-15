const { schemaComposer } = require('graphql-compose');

const OtpTC = schemaComposer.createObjectTC({
    name: 'OtpTC',
    fields: {
        msg: 'String',
        sessionId: 'String!'
    },
});

module.exports = { OtpTC };
