'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    user_id: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    province: DataTypes.STRING,
    regency: DataTypes.STRING,
    district: DataTypes.STRING,
    village: DataTypes.STRING,
    pos_code: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};