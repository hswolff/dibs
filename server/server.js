const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const createApi = require('./api');

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

  app.use(cors(), bodyParser.json());

  app.use('/api', createApi({ Models: db.Models }));

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/`);
  });
}

createServer();
