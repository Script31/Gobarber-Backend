module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatr_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatr_id');
  },
};
