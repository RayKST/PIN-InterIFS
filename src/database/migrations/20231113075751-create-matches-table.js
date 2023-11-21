'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('match', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tournamentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      teamOne: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      teamTwo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pointsTeamOne: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      pointsTeamTwo: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      matchStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      matchLevel: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("match");
  }
};
