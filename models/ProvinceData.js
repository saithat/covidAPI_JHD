const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

// Specifying the format of the JSON data
const dataIntlSchema = mongoose.Schema({
  FIPS: Number,
  Admin2: String,
  Province_State: String,
  Country_Region: String,
  Last_Update: Date,
  Lat: Double,
  Long_: Double,
  Confirmed: Number,
  Deaths: Number,
  Recovered: Number,
  Active: Number,
  Combined_Key: String,
  date: Date,
  Incidence_Rate: Number,
  'Case-Fatality_Ratio': Number,
});

module.exports = mongoose.model('covid-data', dataIntlSchema, 'all_intl');