import express from "express";
import { authenticateToken } from "../../middleware/auth/authMiddleWare.js";
import { createSettings, settings, settingshome } from "./settings.controller.js";

const router = express.Router();

router.post("/settings/create", authenticateToken, createSettings);
router.get("/settings", settings);
router.get("/settings-frontend", settingshome);

export default router;
