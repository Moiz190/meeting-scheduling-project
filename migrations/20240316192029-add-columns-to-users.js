'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "bufferTime", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Users", "dayAvailableStart", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Users", "dayAvailableEnd", {
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "bufferTime");
    await queryInterface.removeColumn("Users", "dayAvailableStart");
    await queryInterface.removeColumn("Users", "dayAvailableEnd");

  }
};
