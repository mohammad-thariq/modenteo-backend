import express from "express";
import {
  createBrands,
  deleteBrandsById,
  getAllBrands,
  getBrandsById,
  updateBrandsById,
} from "./brands.controller.js";
import { getBrandsByStatus } from "./brands.service.js";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/brands/create", authenticateToken, createBrands);
router.get("/brands", authenticateToken, getAllBrands);
router.get("/brands/:id", authenticateToken, getBrandsById);
router.get("/list/brands", authenticateToken, getBrandsByStatus);
router.patch("/brands/update/:id", authenticateToken, updateBrandsById);
router.delete("/brands/delete/:id", authenticateToken, deleteBrandsById);

export default router;
