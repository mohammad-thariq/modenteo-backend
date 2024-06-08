import express from "express";
import {authenticateToken} from "../../../middleware/auth/authMiddleWare.js";
import {
  createSpotLight,
  deleteSpotLightById,
  getAllSpotLight,
  getSpotLightById,
  getSpotLightByStatus,
  updateSpotLightById,
} from "./spotLight.controller.js";

const router = express.Router();

router.post("/spot_light/create", authenticateToken, createSpotLight);
router.get("/spot_light", authenticateToken, getAllSpotLight);
router.get("/spot_light/:id", authenticateToken, getSpotLightById);
router.get("/list/spot_light", authenticateToken, getSpotLightByStatus);
router.patch(
  "/spot_light/update/:id",
  authenticateToken,
  updateSpotLightById
);
router.delete(
  "/spot_light/delete/:id",
  authenticateToken,
  deleteSpotLightById
);

export default router;
