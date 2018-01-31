const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const executableSchema = require('./graphql');

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema: executableSchema })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, () => {
  console.log('Server ready at http://localhost:3000/');
});
