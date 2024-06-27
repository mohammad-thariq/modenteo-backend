import express from "express";
import {
  createBrands,
  deleteBrandsById,
  getAllBrands,
  getBrandByStatus,
  getBrandsById,
  updateBrandsById,
} from "./brands.controller.js";
import { authenticateToken } from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/brands/create", authenticateToken, createBrands);
router.get("/brands", authenticateToken, getAllBrands);
router.get("/brands/:id", authenticateToken, getBrandsById);
router.get("/list/brands", authenticateToken, getBrandByStatus);
router.get("/filter/brands", getBrandByStatus);
router.patch("/brands/update/:id", authenticateToken, updateBrandsById);
router.delete("/brands/delete/:id", authenticateToken, deleteBrandsById);

export default router;
