const checkAccess = (resolvers) => {
    Object.keys(resolvers).forEach((k) => {
        resolvers[k] = resolvers[k].wrapResolve((next) => async (rp) => {
            const { user } = rp.context;
            if (!user) {
                throw new Error('You must be logged in to view this data.');
            }
            rp.beforeQuery = async (query) => {
                console.log('query called');
                if (user.role.indexOf('user') > -1) {
                    query.where({_userId : user._id});
                }
            }
            return next(rp);
        });
    });
    return resolvers
}

module.exports = { checkAccess }