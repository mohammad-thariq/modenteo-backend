import express from "express";
import {authenticateToken} from "../../../middleware/auth/authMiddleWare.js";
import {
  createBanner,
  deleteBannerById,
  getAllBanner,
  getBannerById,
  getBannerByStatus,
  updateBannerById,
} from "./homePageBanner.controller.js";

const router = express.Router();

router.post("/banner/create", authenticateToken, createBanner);
router.get("/banner", authenticateToken, getAllBanner);
router.get("/banner/:id", authenticateToken, getBannerById);
router.get("/list/banner", authenticateToken, getBannerByStatus);
router.patch("/banner/update/:id", authenticateToken, updateBannerById);
router.delete("/banner/delete/:id", authenticateToken, deleteBannerById);

export default router;
