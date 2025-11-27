import express from "express";
import { addBill, getBills } from "../controllers/billController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addBill);
router.get("/", auth, getBills);

export default router;
