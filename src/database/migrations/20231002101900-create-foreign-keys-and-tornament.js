'use strict';

const { query } = require('express');
const sequelize = require('..');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tornament', { 
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
    numberOfTeams: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    teamsTornament: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    startTornament:{
      type: Sequelize.DATE,
      allowNull: true,
    },
    endTornament:{
      type: Sequelize.DATE,
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
  await queryInterface.addColumn('users', 'teamID', {
    type: Sequelize.INTEGER,
    allowNull: true,
    // references:{
    //   model: "teams",
    //   key: "id",
    // }
  });
  await queryInterface.addColumn('teams', 'creatorID', {
    type: Sequelize.INTEGER,
    allowNull: true,
    // references:{
    //   model: "users",
    //   key: "id",
    // }
  })
  // await queryInterface.addConstraint('users', {
  //   fields: ['teamID'],
  //   type: 'foreign key',
  //   name: 'FK_TEAMID_USER',
  //   references: {
  //     table: 'teams',
  //     field: 'id'
  //   },
  //   onDelete: 'cascade',
  //   onUpdate: 'cascade'
  // });
},
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'teamID'),
    await queryInterface.removeColumn('teams', 'creatorID')
    await queryInterface.dropTable('tornament')
  }
};
