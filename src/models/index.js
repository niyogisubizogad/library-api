import { Sequelize, DataTypes } from "sequelize";
import database from "../config/database.js";

import defineBook from "./book.js";
import defineUser from "./user.js";
import defineLoan from "./loan.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = database[env] || database.development;

let sequelize;

if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
    ...dbConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

const Book = defineBook(sequelize, DataTypes);
const User = defineUser(sequelize, DataTypes);
const Loan = defineLoan(sequelize, DataTypes);

const setupAssociations = () => {
  User.hasMany(Loan, { foreignKey: "userId" });
  Loan.belongsTo(User, { foreignKey: "userId" });

  Book.hasMany(Loan, { foreignKey: "bookId" });
  Loan.belongsTo(Book, { foreignKey: "bookId" });
};

setupAssociations();

export {
  sequelize,
  Book,
  User,
  Loan,
};