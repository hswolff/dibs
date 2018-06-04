const express = require('express');

module.exports = function createApi({ Models }) {
  const api = express.Router();

  // Get all Dibs
  api.get('/dibs', async (req, res) => {
    res.json({
      data: await Models.Dib.find().sort('-createdAt'),
    });
  });

  // Create a Dib
  api.post('/dibs', async (req, res) => {
    const { creator, title } = req.body;

    if (!creator || !title) {
      return res.status(500).json({
        error: 'Must include a "creator" and a "title".',
      });
    }

    res.json({
      data: await Models.Dib.create({
        creator,
        title,
      }),
    });
  });

  return api;
};
