const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const bcrypt = require("bcrypt");

const { verifyToken } = require('./utils/validate');
const graphqlSchema = require("./appSchema");
const { accessFile, fileUpload, removeFile } = require("./routes/files");
const { User } = require("./db/user");

const startServer = async (app) => {
    app.get('/', (req, res) => {
        res.send('Server running!');
    });

    app.post('/file/upload', fileUpload);
    app.get('/file/:fileId', accessFile);
    app.delete('/file/:fileId', removeFile);

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

const createAdminUser = async () => {
    try {
        const oldUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (oldUser) {
            console.info("Admin account exist.");
        } else {
            const encryptedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            const request = {
                name: 'System Admin',
                username: 'Admin',
                email: process.env.ADMIN_EMAIL,
                phone: "",
                password: encryptedPassword,
                role: ['admin'],
            }
            const user = await User.create(request);
            console.info("Admin User created " + user._id);
        }
    } catch (e) {
        console.error(e);
        console.error("Unable to validate admin account");
    }
}

module.exports = {
    createAdminUser: createAdminUser
};

module.exports = { startServer }