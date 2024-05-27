import express from "express";
import {
  createChildCategory,
  deleteChildCategoryById,
  getAllChildCategories,
  getChildCategoryById,
  getChildCategoryByStatus,
  updateChildCategoryById,
} from "./childCategories.controller.js";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/child_categories/create", authenticateToken, createChildCategory);
router.get("/child_categories", authenticateToken, getAllChildCategories);
router.get("/child_categories/:id", authenticateToken, getChildCategoryById);
router.get(
  "/list/child_categories",
  authenticateToken,
  getChildCategoryByStatus
);
router.patch(
  "/child_categories/update/:id",
  authenticateToken,
  updateChildCategoryById
);
router.delete(
  "/child_categories/delete/:id",
  authenticateToken,
  deleteChildCategoryById
);

export default router;
