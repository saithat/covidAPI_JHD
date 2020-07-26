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
    var q = req.params.id.toLowerCase();
    q = q.charAt(0).toUpperCase() + q.slice(1);
    var query = {"$regex": ".*" + q + ".*" , "$options": "i"};
    const covidData = await Data.find({ "Province_State": query});
    //const covidData = await Data.find({ Province_State: new RegExp('/^' +  req.params.id + '/' )});
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
}, () => console.log(red.params.id));

router.post("/api/add", (req, res) => {
  var myData = new Data(req.body);
  myData.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });

module.exports = router;
