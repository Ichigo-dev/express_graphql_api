import { ApolloServer } from 'apollo-server-express';
import  express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import fs from 'fs';

const typeDefs: string = fs.readFileSync('./typeDefs.graphql', 'utf-8');

type PhotoType = {
  id: string,
  name: string,
  description: string,
  url: string
};

type UserType = {
  id: string
  name: string
}

var _id: number = 0;
var photos: PhotoType[] = [];

var _user_id: number = 0;
var users: UserType[] = [];

const resolvers = {
  Query: {
    totalPhotos: (): number => photos.length,
    allPhotos: (): PhotoType[] => photos,
    allUsers: (): UserType[] => users
  },
  Mutation: {
    newPhoto(parent: any, args: any) {
      var tmp_photo = {
        id: _id++,
        ...args.input
      };
      photos.push(tmp_photo);
      return tmp_photo;
    },
    newUser(parent: any, args: any) {
      const tmp_user: UserType = {
        id: _user_id++,
        ...args.input
      };

      users.push(tmp_user);
      return tmp_user;
    }
  },
  Photo: {
    url: (parent: any) => `http://yoursite.com/img/${parent.id}`
  }
}

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
