const { MetadataTC } = require('../db/metadata');
const { GenericTC } = require("../types/generic.type");
const MetadataService = require("../services/metadata.service");

const MetadataQuery = {
    metadataFindById: MetadataTC.mongooseResolvers.findById(),
    metadataList: MetadataTC.mongooseResolvers.pagination(),
}

const MetadataMutations = {
    metadataCreate: {
        type: GenericTC,
        args: {
            type: 'String!',
            name: 'String!',
            description: 'String',
            key: 'String',
            image: 'Int'
        },
        resolve: MetadataService.create,
    },
    metadataUpdate: {
        type: GenericTC,
        args: {
            id: 'ID!',
            type: 'String!',
            name: 'String!',
            description: 'String',
            key: 'String',
            image: 'Int',
            status: 'String!',
        },
        resolve: MetadataService.update,
    }
};

module.exports = { MetadataQuery, MetadataMutations };