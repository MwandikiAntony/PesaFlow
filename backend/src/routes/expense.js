import express from "express";
import { addExpense, getExpenses } from "../controllers/expenseController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addExpense);
router.get("/", auth, getExpenses);

export default router;
