const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Re-route to /api to show the data
router.get('/', async (req, res) => {
  return res.redirect('/api');
});

// Shows all the data
router.get('/api', async (req, res) => {
  try {
    const covidData = await Data.find();
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

// Shows data of the given location_id
router.get('/api/:id', async (req, res) => {
  try {
    const covidData = await Data.find({ Province_State: req.params.id });
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
