const { User } = require("../db/user");

const checkAccess = (resolvers) => {
    Object.keys(resolvers).forEach((k) => {
        resolvers[k] = resolvers[k].wrapResolve((next) => async (rp) => {
            const { user } = rp.context;

            if (!user) {
                throw new Error('You must be logged in to add a product.');
            }

            if (!user.seller_access) {
                throw new Error('Only a seller can add a product.');
            }

            rp.beforeRecordMutate = async function (doc, rp) {
                if (!doc._sellerId) {
                    doc._sellerId = user._id;
                }
                console.log('mutation called', doc);
                return doc;
            }

            rp.beforeQuery = async (query) => {
                console.log('query called', query);
                query.where({_sellerId : user._id});
            }
            return next(rp);
        });
    });
    return resolvers
}

module.exports = { checkAccess }