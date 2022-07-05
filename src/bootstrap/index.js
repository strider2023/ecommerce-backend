const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const fs = require("fs");

const { verifyToken } = require('../utils/validate');
const graphqlSchema = require("./graphqlSchemas");
const { initRoutes } = require("./routes");
const { createAdminUser } = require("./bootstrapDatabase");

const startServer = async (app) => {
    initRoutes(app);
    //Create folders if local storage type
    if ((process.env.STORAGE_TYPE || "local").toLowerCase() === 'local') {
        await createFolders();
    }
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

const createFolders = async () => {
    const DIR_IMAGES = './assets/images';
    const DIR_VIDEOS = './assets/videos';
    const DIR_DOCUMENTS = './assets/documents';
    const DIR_UPLOADS = './assets/uploads';
    if (!fs.existsSync(DIR_IMAGES)) {
        fs.mkdirSync(DIR_IMAGES, { recursive: true });
    }
    if (!fs.existsSync(DIR_VIDEOS)) {
        fs.mkdirSync(DIR_VIDEOS, { recursive: true });
    }
    if (!fs.existsSync(DIR_DOCUMENTS)) {
        fs.mkdirSync(DIR_DOCUMENTS, { recursive: true });
    }
    if (!fs.existsSync(DIR_UPLOADS)) {
        fs.mkdirSync(DIR_UPLOADS, { recursive: true });
    }
}

module.exports = { startServer }