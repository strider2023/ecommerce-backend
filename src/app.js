const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { verifyToken } = require('./middlewares/validate');
const cors = require('cors');
const logger = require('morgan');

const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const graphqlSchema = require("./appSchema");

const uri = process.env.MONGO_DB_URL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express();
app.use(bodyParser.json());
// var corsOption = {
//     origin: "*",
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     exposedHeaders: ['x-auth-token']
// };
// app.use(cors(corsOption));
// app.use(logger('common'))

app.get('/', (req, res) => {
    res.send('Server running!');
});

mongoose.connect(uri, options)
    .then(async () => {
        startApolloServer(app);
    })
    .catch(error => {
        throw error
    });

async function startApolloServer(app) {
    // Required logic for integrating with Express
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        schema: graphqlSchema,
        csrfPrevention: true,
        playground: process.env.NODE_ENV === 'development' ? true : false,
        instrospection: process.env.NODE_ENV === 'development' ? true : false,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageGraphQLPlayground],
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            const user = verifyToken(token);
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