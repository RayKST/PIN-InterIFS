'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'createdAt',{
      type: Sequelize.DATE,
      allowNull: true,
    }),
    await queryInterface.addColumn('users', 'updatedAt',{
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'createdAt');
    await queryInterface.removeColumn('users', 'updatedAt')
  }
};
