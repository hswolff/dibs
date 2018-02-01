const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const db = require('./db');
const executableSchema = require('./graphql');

const PORT = 8080;

async function createServer() {
  const app = express();

  try {
    await db.connect();
  } catch (error) {
    console.error('Unable to connect to mongodb', error);
  }

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({ schema: executableSchema, context: { Models: db.Models } })
  );

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/`);
  });
}

createServer();
