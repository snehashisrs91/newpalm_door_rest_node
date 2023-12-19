const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.project = require("../models/project.model.js")(sequelize, Sequelize);
db.quotes = require("../models/quotes.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);
//db.manufac_interioraccessories_master = require("./interioraccessories.model.js")(sequelize, Sequelize);
/* db.series = require("../models/series.model.js")(sequelize, Sequelize);
db.series = require("../models/measurementType.model.js")(sequelize, Sequelize);
db.series = require("../models/rsoGap.model.js")(sequelize, Sequelize);
db.series = require("../models/glassType.model.js")(sequelize, Sequelize);
db.series = require("../models/grilles.model.js")(sequelize, Sequelize);
db.series = require("../models/fixedWindowProfiles.model.js")(sequelize, Sequelize);
db.series = require("../models/exteriorColours.model.js")(sequelize, Sequelize); 
db.series = require("../models/globalProperties.model.js")(sequelize, Sequelize);*/


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["ManufacturerUser", "ManufacturerReports", "ManufacturerWindowQuote", "ResellerUser", "ResellerReports", "ResellerWindowQuote", "ResellerCustomer", "SystemUser", "SystemCommonPartsDatabase", "SystemReports"];

module.exports = db;
