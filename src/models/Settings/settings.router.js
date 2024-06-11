import express from "express";
import { authenticateToken } from "../../middleware/auth/authMiddleWare.js";
import { createSettings, settings } from "./settings.controller.js";

const router = express.Router();

router.post("/settings/create", authenticateToken, createSettings);
router.get("/settings", authenticateToken, settings);

export default router;
