const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const db = require('./db');
const createApi = require('./api');

const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN || 'http://localhost';

let retryCount = 0;

async function createServer() {
  const app = express();

  const httpServer = http.Server(app);
  const io = socketIo(httpServer);

  try {
    console.log('Connecting to MongoDB');
    await db.connect({ io });
  } catch (error) {
    console.error('Unable to connect to mongodb', error);
    if (++retryCount < 3) {
      console.log('Trying to connect to mongodb again in 3 seconds...');
      setTimeout(createServer, 3000);
      return;
    }
    process.exit(1);
  }

  console.log('Connected!');

  app.use(cors(), bodyParser.json());

  app.use('/api', createApi({ Models: db.Models }));

  httpServer.listen(PORT, () => {
    console.log(`Server ready at ${DOMAIN}:${PORT}/`);
  });
}

createServer();
