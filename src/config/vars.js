const path = require('path');

// import .env variables
// Only load .env file if not on Vercel (Vercel uses environment variables)
if (process.env.VERCEL !== '1') {
  require('dotenv-safe').config({
    path: path.join(__dirname, '../../.env'),
    example: path.join(__dirname, '../../.env.example'),
    allowEmptyValues: true,
  });
} else {
  // On Vercel, just use dotenv without the safe check
  require('dotenv-safe').config({
    allowEmptyValues: true,
  });
}

console.log(process.env.MYSQL_HOST);

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  jwtSecret: process.env.JWT_SECRET,
  mysqlConfig: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'idreesiadb',
  },
};
