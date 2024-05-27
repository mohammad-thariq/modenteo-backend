import express from "express";
import {
  createSubCategory,
  deleteSubCategoryById,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoryByStatus,
  updateSubCategoryById,
} from "./subCategories.controller.js";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/sub_categories/create", authenticateToken, createSubCategory);
router.get("/sub_categories", authenticateToken, getAllSubCategories);
router.get("/sub_categories/:id", authenticateToken, getSubCategoryById);
router.get("/list/sub_categories", authenticateToken, getSubCategoryByStatus);
router.patch(
  "/sub_categories/update/:id",
  authenticateToken,
  updateSubCategoryById
);
router.delete(
  "/sub_categories/delete/:id",
  authenticateToken,
  deleteSubCategoryById
);

export default router;