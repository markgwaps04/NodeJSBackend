'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      phoneNumber : {
        allowNull: false,
        type: Sequelize.STRING
      },
      full_address : {
        allowNull: false,
        type: Sequelize.STRING
      },
      postcode : {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username : {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true
      },
      password : {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      state : {
        type : Sequelize.BOOLEAN,
        defaultValue : 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};