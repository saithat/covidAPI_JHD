const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
require('dotenv').config();

// App + PORT + Database URL
const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URI = process.env.MONGODB_URI || process.env.DATABASE_URI;

// Middleware + Routes
// DEV (TEST)
app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  size: '10M', // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  path: path.join('log'),
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

const covidRoutes = require('./routes/data-routes');
app.use(covidRoutes);

// Connect to MongoDB -- Local Database
mongoose.connect(
  CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('DB connection successful!')
);

// Listen to the server
app.listen(PORT, () => console.log(`Listening...http://localhost:${PORT}`));
