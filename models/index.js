"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
console.log(config)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.categories = require("./category")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);
db.books = require("./book")(sequelize, Sequelize);
db.images = require("./image")(sequelize, Sequelize);
db.profiles = require("./profile")(sequelize, Sequelize);

db.books.hasMany(db.images, { foreignKey: "book_id" });
db.images.belongsTo(db.books, { foreignKey: "book_id" });
db.books.belongsTo(db.categories, { foreignKey: "category_id" });
db.users.hasOne(db.profiles, { foreignKey: "user_id" });
db.profiles.belongsTo(db.users, { foreignKey: "user_id" });

module.exports = db;
