const types = {
  Photo: {
    url: (parent: any) => `http://yoursite.com/img/${parent.id}`
  }
};

export default types;
