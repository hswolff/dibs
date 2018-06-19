const mongoose = require('mongoose');

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
    // TODO: Update schema with claimed information.
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

  // TODO: Open Change Stream to watch for changes.
  // TODO: Push changes from change stream to the client.
}
exports.connect = connect;
