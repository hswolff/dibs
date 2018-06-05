const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const db = require('./db');
const createApi = require('./api');

const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN || 'http://localhost';

async function createServer() {
  const app = express();

  app.use(cors(), bodyParser.json());

  const httpServer = http.Server(app);
  const io = socketIo(httpServer);

  try {
    await db.connect(io);
  } catch (error) {
    console.error(error.message);
    console.error('Closing server');
    process.exit(1);
  }

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api', createApi({ Models: db.Models }));

  httpServer.listen(PORT, () => {
    console.log(`Server ready at ${DOMAIN}:${PORT}/`);
  });
}

createServer();
