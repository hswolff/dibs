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

  // Claim a Dib
  api.put('/dibs/:dibId', async (req, res) => {
    const { dibId } = req.params;
    const { user } = req.body;

    if (!user) {
      return res.status(500).json({
        error: 'No "user" given to claim Dib.',
      });
    }

    let dib;
    try {
      dib = await Models.Dib.findById(dibId);
    } catch (error) {
      return res.status(500).json({
        error: 'Cannot find Dib with given id',
      });
    }

    if (dib.claimed.user) {
      return res.status(500).json({
        error: 'Dib has already been claimed!',
      });
    }

    dib.claimed.user = user;
    dib.claimed.time = new Date();

    res.json({
      data: await dib.save(),
    });
  });

  return api;
};
