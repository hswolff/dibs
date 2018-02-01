const pubsub = require('./pubsub');

const resolvers = {
  Query: {
    dibs: (root, opts, { Models }) => Models.Dib.find().sort('-createdAt'),
  },
  Mutation: {
    createDib(root, { creator, title }, { Models }) {
      return Models.Dib.create({
        creator,
        title,
      });
    },
    async claimDib(root, { id, user }, { Models }) {
      let dib;
      try {
        dib = await Models.Dib.findById(id);
      } catch (error) {
        throw new Error('Cannot find Dib with given id');
      }

      if (dib.claimed.user) {
        throw new Error('Dib has already been claimed!');
      }

      dib.claimed.user = user;
      dib.claimed.time = new Date();

      return dib.save();
    },
  },
  Subscription: {
    dibChanged: {
      subscribe: () => pubsub.asyncIterator('dibChanged'),
    },
  },
};

module.exports = resolvers;
