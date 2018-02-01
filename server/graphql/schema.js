const schema = `
    type Mutation {
      createDib(creator: String!, title: String!): Dib
      claimDib(id: ID!, user: String!): Dib
    }

    type Query { dibs: [Dib]! }

    type Dib {
      id: ID!,
      creator: String,
      title: String!,
      createdAt: String!,
      updatedAt: String!,
      claimed: DibClaimed
    }

    type DibClaimed {
      user: String,
      time: String,
    }
`;

module.exports = schema;
