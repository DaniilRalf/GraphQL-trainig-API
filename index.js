import {ApolloServer} from "apollo-server-express"
import express from 'express'
import {typeDefs} from "./typeDefs.js";
import {resolvers} from "./resolvers.js";


async function startApolloServer() {
    /**
     * вызываем express для инициализации приложения
     * */
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    /**
     * интеграция ApolloServer с express
     * */
    server.applyMiddleware({ app });

    app.listen({port: 4000}, () => {
        console.log(`GraphGQ start on http://localhost:4000${server.graphqlPath}`)
    })
    app.get('/', (req, res) => {
        return res.end('Welcome to API')
    })
}
startApolloServer()