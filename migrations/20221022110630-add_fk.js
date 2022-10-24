'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('cars', {
      fields:['userId'],
      type:'foreign key',
      name:'user_fk',
      references:{
        table:'users',
        field:'id'
      },
      onDelete:'cascade',
      onUpdate:'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('cars','user_fk')
  }
};