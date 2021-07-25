import { ApolloServer } from 'apollo-server-express';
import  express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import fs from 'fs';
import { MongoClient } from 'mongodb';

import resolvers from './resolvers';

require('dotenv').config();

const typeDefs: string = fs.readFileSync('./typeDefs.graphql', 'utf-8');

async function start() {
  const app = express();

  // setting MongoDB
  const MONGO_DB: string = `mongodb://localhost:27017/${process.env.DB_HOST}`;
  const client = await MongoClient.connect(MONGO_DB);
  const db = client.db();
  const context = { db };

  // setting ApolloServer
  const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });
  server.applyMiddleware({ app });

  // setting Routes
  app.get('/', (req: express.Request, res: express.Response): void => {
    res.send("Welcome to the PhotoShare API");
  });
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  app.listen({ port: 4000 }, (): void => {
    console.log("GraphQL Server running @ http://localhost:4000")
  })
}

start();
