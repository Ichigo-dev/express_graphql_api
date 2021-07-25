import types from './Types';

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
  ...types
}

export default resolvers;
