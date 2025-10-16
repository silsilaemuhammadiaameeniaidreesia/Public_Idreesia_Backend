const { Sequelize } = require('sequelize');
const logger = require('./logger');
const { mysqlConfig } = require('./vars');

/**
 * Connect to mysql db
 *
 * @returns {object} mysql connection
 * @public
 */

const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password,
  {
    host: mysqlConfig.host,
    dialect: 'mysql',
  });

async function checkConnection() {
    try {
        await sequelize.authenticate();
        logger.info('Connection to the database has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}
checkConnection();
module.exports.sequelize = sequelize;
