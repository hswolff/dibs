const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN || 'http://localhost';

async function createServer() {
  const app = express();

  app.use(cors(), bodyParser.json());

  const httpServer = http.Server(app);

  // TODO: Add root level handler

  // TODO: Connect to MongoDB

  // TODO: Register API handlers.

  // TODO: Open socket server.

  httpServer.listen(PORT, () => {
    console.log(`Server ready at ${DOMAIN}:${PORT}/`);
  });
}

createServer();
