import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expense.js";
import billRoutes from "./routes/bills.js";
import tokenRoutes from "./routes/tokens.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/tokens", tokenRoutes);

app.listen(process.env.PORT, () => {
  console.log("PesaFlow Backend running on port", process.env.PORT);
});
