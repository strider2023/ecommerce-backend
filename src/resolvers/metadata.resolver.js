const { MetadataTC } = require('../db/metadata');

const checkAccess = (resolvers) => {
    Object.keys(resolvers).forEach((k) => {
        resolvers[k] = resolvers[k].wrapResolve((next) => async (rp) => {
            const { user } = rp.context;

            rp.beforeRecordMutate = (doc, rp) => {
                if (user) {
                    // Check if admin
                    const canMakeUpdate = user.role ? user.admin_access : false;
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
    metadataFindById: MetadataTC.mongooseResolvers.findById(),
    metadataList: MetadataTC.mongooseResolvers.pagination(),
}

const MetadataMutations = {
    ...checkAccess({
        metadataCreate: MetadataTC.mongooseResolvers.createOne(),
        metadataUpdateById: MetadataTC.mongooseResolvers.updateById(),
        metadataRemoveById: MetadataTC.mongooseResolvers.removeById(),
    }),
};

module.exports = { MetadataQuery, MetadataMutations };