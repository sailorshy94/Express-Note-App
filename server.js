const express = require('express');
// morgan allows us to log reqs locally
const morgan = require('morgan');
// used to send data to dir
const fs = require('fs');

// runs specific check for router # using nullish coalescence operator; will use for Heroku deployment
const PORT = process.env.PORT ?? 3001;
const app = express();
