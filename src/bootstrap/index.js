const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");

const { verifyToken } = require('../utils/validate');
const graphqlSchema = require("./graphqlSchemas");
const { initRoutes } = require("./routes");
const { createAdminUser } = require("./bootstrapDatabase");

const startServer = async (app) => {
    initRoutes(app);
    //Create super admin user
    await createAdminUser();
    // Required logic for integrating with Express
    const httpServer = http.createServer(app);
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        schema: graphqlSchema,
        csrfPrevention: true,
        playground: process.env.NODE_ENV === 'development' ? true : false,
        instrospection: process.env.NODE_ENV === 'development' ? true : false,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageGraphQLPlayground],
        context: async ({ req }) => {
            const token = req.headers.authorization || '';
            const user = await verifyToken(token);
            return { user };
        }
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
        app
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
}

module.exports = { startServer }