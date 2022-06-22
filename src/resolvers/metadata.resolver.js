const { MetadataTC } = require('../db/metadata');

const checkAccess = (resolvers) => {
    Object.keys(resolvers).forEach((k) => {
        resolvers[k] = resolvers[k].wrapResolve((next) => async (rp) => {
            const { user } = rp.context;

            rp.beforeRecordMutate = async function (doc, rp) {
                console.log('mutation called');
                if (user) {
                    // Check if admin
                    const canMakeUpdate = user.roles ? ((user.roles.indexOf('admin') > -1) ? true : false) : false;
                    // Else throw error
                    if (!canMakeUpdate) {
                        throw new Error('You do not have permissions make any changes.');
                    }
                } else {
                    throw new Error('You must be logged in to update this data.');
                }
            }

            return next(rp);
        });
    });
    return resolvers
}

const MetadataQuery = {
    metadataById: MetadataTC.mongooseResolvers.findById(),
    metadataPagination: MetadataTC.mongooseResolvers.pagination(),
}

const MetadataMutations = {
    ...checkAccess({
        metadataCreateOne: MetadataTC.mongooseResolvers.createOne(),
        metadataUpdateById: MetadataTC.mongooseResolvers.updateById(),
        metadataRemoveById: MetadataTC.mongooseResolvers.removeById(),
    }),
};

module.exports = { MetadataQuery, MetadataMutations };