const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');
const createApi = require('./api');

const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN || 'http://localhost';

async function createServer() {
  const app = express();

  app.use(cors(), bodyParser.json());

  try {
    await db.connect();
  } catch (error) {
    console.error(error.message);
    console.error('Closing server');
    process.exit(1);
  }

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api', createApi({ Models: db.Models }));

  app.listen(PORT, () => {
    console.log(`Server ready at ${DOMAIN}:${PORT}/`);
  });
}

createServer();
