const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dibScheme = new Schema(
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

module.exports = Dib;
