'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const salt = await bcrypt.genSalt(10);

    return queryInterface.bulkInsert('Users', [{
      "id" : 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'joe@example.com',
      username : "johndoe",
      postcode : "0441",
      phoneNumber : "+639093522667",
      password : await bcrypt.hash("mark04", salt),
      full_address : "Makilala, North Cotabato",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "id" : 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@example.com',
      username : "janedoe",
      phoneNumber : "+639093522667",
      postcode : "1312",
      password : await bcrypt.hash("mark04", salt),
      full_address : "Makilala, North Cotabato",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "id" : 3,
      firstName: 'Yuan',
      lastName: 'Doe',
      postcode : "3233",
      email: 'yuandoe@example.com',
      username : "yuandoe",
      phoneNumber : "+639093522667",
      password : await bcrypt.hash("mark04", salt),
      full_address : "Makilala, North Cotabato",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "id" : 4,
      firstName: 'Mark Anthony',
      lastName: 'Libres',
      phoneNumber : "+639093522667",
      postcode : "3434",
      email: 'marklibres@example.com',
      username : "marklibres",
      password : await bcrypt.hash("mark04", salt),
      full_address : "Makilala, North Cotabato",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Carl',
      lastName: 'Fernandez',
      phoneNumber : "+639093522667",
      postcode : "34341",
      email: 'carlfernandex@example.com',
      username : "carfernandez",
      password : await bcrypt.hash("mark04", salt),
      full_address : "Makilala, North Cotabato",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'John',
      lastName: 'Libres',
      phoneNumber : "+639093522667",
      postcode : "1244",
      email: 'johnlibres@example.com',
      username : "johnlibres",
      password : await bcrypt.hash("mark04", salt),
      full_address : "Makilala, North Cotabato",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

