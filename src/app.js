import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import { sequelize } from './models/index.js';


const app = express();

app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));



export default app;
