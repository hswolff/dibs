const mongoose = require('mongoose');
const Models = require('./models');

// Database Name
const dbName = 'changeStreamsDemo';

// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

async function connect() {
  return mongoose.connect(url);
}
exports.connect = connect;

exports.Models = Models;
