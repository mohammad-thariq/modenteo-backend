import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  getCategoryByStatus,
  updateCategoryById,
} from "./categories.controller.js";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/categories/create", authenticateToken, createCategory);
router.get("/categories", authenticateToken, getAllCategories);
router.get("/categories/:id", authenticateToken, getCategoryById);
router.patch("/categories/update/:id", authenticateToken, updateCategoryById);
router.delete("/categories/delete/:id", authenticateToken, deleteCategoryById);
router.get("/list/categories", authenticateToken, getCategoryByStatus);

export default router;
