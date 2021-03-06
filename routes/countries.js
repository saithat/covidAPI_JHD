const express = require('express');
const router = express.Router();
const Data = require('../models/ProvinceData');

/*
router.get('/api/all_intl', async (req, res) => {
    try {
      const covidData = await Data.find();
      res.json(covidData);
    } catch (err) {
      res.json({ message: err });
    }
  });
*/
  router.get('/all_intl/:country?/:province?', async (req, res) => {
    try {
      var country = req.params.country;
      var province = req.params.province;
      var covidData;
      if(!country && !province)
      {
        covidData = await Data.find();
      }else if (country && !province)
      {
        var country = req.params.country.toLowerCase();

        country = country.charAt(0).toUpperCase() + country.slice(1);
        country = {"$regex": "^" + country + "$" , "$options": "i"};
        covidData = await Data.find({ "Country_Region": country});
      }else
      {
        var country = req.params.country.toLowerCase();
        var province = req.params.province.toLowerCase();
        country = country.charAt(0).toUpperCase() + country.slice(1);
        country = {"$regex": ".*" + country + ".*" , "$options": "i"};
        province = province.charAt(0).toUpperCase() + province.slice(1);
        province = {"$regex": ".*" + province + ".*" , "$options": "i"};

        covidData = await Data.find( {$and: [
            {"Country_Region": country},
            { "Province_State": province}
        ]});
      }
      //const covidData = await Data.find({ Province_State: new RegExp('/^' +  req.params.id + '/' )});
      res.json(covidData);
    } catch (err) {
      res.json({ message: err });
    }
  });

  module.exports = router;