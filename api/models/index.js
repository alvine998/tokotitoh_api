const dbConfig = require("../../config/db.config.js");
const mysql2 = require("mysql2")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectModule: mysql2,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.partners = require("./partners.js")(sequelize, Sequelize);
db.categories = require("./categories.js")(sequelize, Sequelize);
db.subcategories = require("./subcategories.js")(sequelize, Sequelize);
db.partners = require("./partners.js")(sequelize, Sequelize);
db.brands = require("./brands.js")(sequelize, Sequelize);
db.types = require("./types.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);
db.provinces = require("./provinces.js")(sequelize, Sequelize);
db.cities = require("./cities.js")(sequelize, Sequelize);
db.districts = require("./districts.js")(sequelize, Sequelize);
db.villages = require("./villages.js")(sequelize, Sequelize);
db.reports = require("./reports.js")(sequelize, Sequelize);
db.ads = require("./ads.js")(sequelize, Sequelize);
db.notifications = require("./notifications.js")(sequelize, Sequelize);

module.exports = db;