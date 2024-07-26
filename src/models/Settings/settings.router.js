import express from "express";
import { authenticateToken } from "../../middleware/auth/authMiddleWare.js";
import { createSettings, settings, settingshome, createSettingsCategory, settingscategory, settingscategoryhome } from "./settings.controller.js";

const router = express.Router();
// Website Settigns
router.post("/settings/create", authenticateToken, createSettings);
router.get("/settings", settings);
router.get("/settings-frontend", settingshome);

// Category Settings
router.post("/settings/:type/create", authenticateToken, createSettingsCategory);
router.get("/settings/:type", settingscategory);
router.get("/settings/:type/frontend", settingscategoryhome);
export default router;
