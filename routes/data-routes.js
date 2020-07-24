const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const { query } = require('express');

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
    var q = req.params.id.toLowerCase();
    q = q.charAt(0).toUpperCase() + q.slice(1);
    const covidData = await Data.find({ Province_State: q});
    //const covidData = await Data.find({ Province_State: new RegExp('/^' +  req.params.id + '/' )});
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
}, () => console.log(red.params.id));

module.exports = router;
