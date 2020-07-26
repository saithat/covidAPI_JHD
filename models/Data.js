const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

// Specifying the format of the JSON data
const dataSchema = mongoose.Schema({
  Province_State: String,
  Country_Region: String,
  Last_Update: Date,
  Lat: Double,
  Long_: Double,
  Confirmed: Number,
  Deaths: Number,
  Recovered: Number,
  Active: Number,
  FIPS: Number,
  Incident_Rate: Double,
  People_Tested: Number,
  People_Hospitalized: Number,
  Mortality_Rate: Double,
  UID: Number,
  ISO3: String,
  Testing_Rate: Double,
  Hospitalization_Rate: Double,
  date: Date
});

module.exports = mongoose.model('covid-data', dataSchema, 'all');
