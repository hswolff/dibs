const schema = `
    type Schema {
      query: Query
      mutation: Mutation
    }

    type Query { dibs: [Dib]! }

    type Mutation {
      createDib(creator: String!, title: String!): Dib
      claimDib(id: ID!, user: String!): Dib
    }

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
