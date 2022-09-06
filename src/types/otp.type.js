const { schemaComposer } = require('graphql-compose');

const OtpTC = schemaComposer.createObjectTC({
    name: 'OtpTC',
    fields: {
        msg: 'String',
        otp: 'String!'
    },
});

module.exports = { OtpTC };
