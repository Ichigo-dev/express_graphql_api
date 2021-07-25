import { ApolloServer } from 'apollo-server-express';
import  express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import fs from 'fs';

import resolvers from './resolvers';

const typeDefs: string = fs.readFileSync('./typeDefs.graphql', 'utf-8');

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

var app = express();

server.applyMiddleware({ app });

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send("Welcome to the PhotoShare API");
});

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen({ port: 4000 }, (): void => {
  console.log("GraphQL Server running @ http://localhost:4000")
})
