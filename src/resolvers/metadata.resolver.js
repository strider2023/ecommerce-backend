const { MetadataTC } = require('../db/metadata');
const { CategoriesTC } = require('../db/categories');
const { GenericTC } = require("../types/generic.type");
const MetadataService = require("../services/metadata.service");

const MetadataQuery = {
    metadataFindById: MetadataTC.mongooseResolvers.findById(),
    metadataList: MetadataTC.mongooseResolvers.pagination(),
    categoriesFindById: CategoriesTC.mongooseResolvers.findById(),
    categoriesList: CategoriesTC.mongooseResolvers.pagination(),
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
    },
    metadataDelete: {
        type: GenericTC,
        args: {
            id: 'ID!',
        },
        resolve: MetadataService.metadataDelete,
    },
    categoryCreate: {
        type: GenericTC,
        args: {
            categoryId: 'String!',
            parentName: 'String!',
            parentId: 'String!',
            categoryName: 'String!',
            description: 'String',
            image: 'Int'
        },
        resolve: MetadataService.categoryCreate,
    },
    categoryUpdate: {
        type: GenericTC,
        args: {
            id: 'ID!',
            categoryId: 'String!',
            parentName: 'String!',
            parentId: 'String!',
            categoryName: 'String!',
            description: 'String',
            image: 'Int',
            status: 'String!',
        },
        resolve: MetadataService.categoryUpdate,
    },
    categoryDelete: {
        type: GenericTC,
        args: {
            id: 'ID!',
        },
        resolve: MetadataService.categoryDelete,
    }
};

module.exports = { MetadataQuery, MetadataMutations };