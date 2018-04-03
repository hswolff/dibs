const mongoose = require('mongoose');
const Models = require('./models');

// Database Name
const dbName = 'dibs';

// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

async function connect({ io }) {
  await mongoose.connect(url);

  // Little hack to ensure that the DB exists so we can attach a changeStream watcher to it.
  const item = await Models.Dib.create({ title: 'dummy', creator: 'dummy' });
  await Models.Dib.remove(item);

  const dibChangeStream = Models.Dib.collection.watch({
    fullDocument: 'updateLookup',
  });
  dibChangeStream.on('change', result => {
    io.emit('dib changeEvent', {
      type: result.operationType,
      dib: {
        claimed: {},
        ...result.fullDocument,
        id: result.fullDocument._id,
      },
    });
  });
}
exports.connect = connect;

exports.Models = Models;
