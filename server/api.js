const express = require('express');

module.exports = function createApi({ Models }) {
  const api = express.Router();

  // Get all Dibs
  api.get('/dibs', async (req, res) => {
    // TODO: Return data from database.

    res.json({
      data: [],
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

    // TODO: Create and return new Dib document.

    res.json({
      data: {},
    });
  });

  // Claim a Dib
  api.put('/dibs/:dibId', async (req, res) => {
    // TODO: Update dib with claimed information.
    // TODO: Save dib with new data.
    // TODO: Return updated dib.

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

    res.json({
      data: dib,
    });
  });

  return api;
};
