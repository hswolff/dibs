const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const http = require('http');

const db = require('./db');
const executableSchema = require('./graphql');

const PORT = process.env.PORT || 8080;

let retryCount = 0;

async function createServer() {
  const app = express();

  try {
    await db.connect();
  } catch (error) {
    console.error('Unable to connect to mongodb', error);
    if (++retryCount < 3) {
      console.log('Trying to connect to mongodb again in 3 second...');
      setTimeout(createServer, 3000);
      return;
    }
    process.exit(1);
  }

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    graphqlExpress({ schema: executableSchema, context: { Models: db.Models } })
  );

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
    })
  );

  const ws = http.createServer(app);
  ws.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/`);

    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: executableSchema,
      },
      {
        server: ws,
        path: '/subscriptions',
      }
    );
  });
}

createServer();
