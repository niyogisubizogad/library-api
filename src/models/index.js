const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");
const defineBook = require("./Book");
const defineUser = require("./User");
const defineLoan = require("./Loan");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

let sequelize;

if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// Initialize models
const Book = defineBook(sequelize, DataTypes);
const User = defineUser(sequelize, DataTypes);
const Loan = defineLoan(sequelize, DataTypes);

// Associations
User.hasMany(Loan, { foreignKey: "userId" });
Loan.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Loan, { foreignKey: "bookId" });
Loan.belongsTo(Book, { foreignKey: "bookId" });

// Export
module.exports = {
  sequelize,
  Book,
  User,
  Loan,
};