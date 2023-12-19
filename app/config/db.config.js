
const config = require("../config/api.config");

module.exports = {
  HOST: config.dbSettings.HOST,
  USER: config.dbSettings.USER,
  PASSWORD: config.dbSettings.PASSWORD,
  DB: config.dbSettings.DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


