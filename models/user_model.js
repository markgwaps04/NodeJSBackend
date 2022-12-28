'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }
  User.init({
    firstName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    full_address : {
      type: DataTypes.STRING,
      allowNull: false
    },
    postcode : {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    phoneNumber : {
      type: DataTypes.STRING,
      allowNull: false
    },
    username : {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    password :{
      type: DataTypes.STRING(256),
      allowNull: false
    },
    state : {
      type : DataTypes.BOOLEAN,
      defaultValue : 0
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['password']
      },
      order: [['id', 'DESC']]
    }
  });
  return User;
};