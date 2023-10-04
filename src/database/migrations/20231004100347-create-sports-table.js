'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sports', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numberOfPlayers: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.createTable('teamsports', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // autoIncrement: true,
        allowNull: false,
      },
      sportID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        // autoIncrement: true,
        allowNull: false,
      },
      teamID: {
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
    await queryInterface.dropTable('sports');
    await queryInterface.dropTable('teamsports');
  }
};
