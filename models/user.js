'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('./../helpers/hash')

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.car)
    }
  }
  user.init({
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate(instance){
        instance.password = hash(instance.password)
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};