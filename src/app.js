import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import { sequelize } from './models/index.js';


const app = express();

app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();

  
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

startServer();

export default app;
