export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Loans', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    borrowedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    returnedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    bookId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id',
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Loans');
}