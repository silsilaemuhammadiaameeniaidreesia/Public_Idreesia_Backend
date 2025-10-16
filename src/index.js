// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
// const mongoose = require('./config/mysql');
// const mysql = require('./config/database');

// Test route - Hello World
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Only start server if running locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  console.log('PORT:', process.env.PORT);
  // listen to requests
  app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
}

/**
* Exports express
* @public
*/
module.exports = app;
