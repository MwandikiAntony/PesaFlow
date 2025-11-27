import express from "express";
import { saveTokenData, getTokenData } from "../controllers/tokenController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, saveTokenData);
router.get("/", auth, getTokenData);

export default router;
