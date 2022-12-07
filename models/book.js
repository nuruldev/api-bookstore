"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Book.belongsTo(models.Category, {
      //   foreignKey: "categoryId",
      //   targetKey: "id",
      // }),
      // Book.hasMany(models.Image, { foreignKey: "book_id" });
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      publisher: DataTypes.STRING,
      price: DataTypes.NUMBER,
      stock: DataTypes.NUMBER,
      thick: DataTypes.NUMBER,
      status: DataTypes.STRING,
      category_id: DataTypes.NUMBER,
      desc: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "Book",
      paranoid: true
    }
  );
  return Book;
};
