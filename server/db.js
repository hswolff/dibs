const mongoose = require('mongoose');

// TODO: Update schema with claimed information.
// TODO: Open Change Stream to watch for changes.
// TODO: Push changes from change stream to the client.

const dibScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Dib = mongoose.model('Dib', dibScheme);

const Models = {
  Dib,
};
exports.Models = Models;

const dbUri = 'mongodb://localhost:27017/dibs';

async function connect() {
  await mongoose.connect(dbUri);
  console.log('Connected to MongoDB');
}
exports.connect = connect;
