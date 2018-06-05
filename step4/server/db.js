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
    claimed: {
      user: String,
      time: Date,
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
