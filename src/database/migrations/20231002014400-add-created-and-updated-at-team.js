'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('teams', 'createdAt',{
      type: Sequelize.DATE,
      allowNull: true,
    }),
    await queryInterface.addColumn('teams', 'updatedAt',{
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('teams', 'createdAt');
    await queryInterface.removeColumn('teams', 'updatedAt');
  }
};
