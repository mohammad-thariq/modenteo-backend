import express from "express";
import authenticateToken from "../../../middleware/auth/authMiddleWare.js";
import {
  createPopularProduct,
  deletePopularProductById,
  getAllPopularProduct,
  getPopularProductById,
  getPopularProductByStatus,
  updatePopularProductById,
} from "./popularProducts.controller.js";

const router = express.Router();

router.post("/popular_produts/create", authenticateToken, createPopularProduct);
router.get("/popular_produts", authenticateToken, getAllPopularProduct);
router.get("/popular_produts/:id", authenticateToken, getPopularProductById);
router.get(
  "/list/popular_produts",
  authenticateToken,
  getPopularProductByStatus
);
router.patch(
  "/popular_produts/update/:id",
  authenticateToken,
  updatePopularProductById
);
router.delete(
  "/popular_produts/delete/:id",
  authenticateToken,
  deletePopularProductById
);

export default router;
