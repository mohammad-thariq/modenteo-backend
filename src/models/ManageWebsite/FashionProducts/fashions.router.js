import express from "express";
import {authenticateToken} from "../../../middleware/auth/authMiddleWare.js";
import {
  createFashion,
  deleteFashionById,
  getAllFashions,
  getFashionById,
  getFashionByStatus,
  updateFashionById,
} from "./fashions.controller.js";

const router = express.Router();

router.post("/fashion_product/create", authenticateToken, createFashion);
router.get("/fashion_product", authenticateToken, getAllFashions);
router.get("/fashion_product/:id", authenticateToken, getFashionById);
router.get("/list/fashion_product", authenticateToken, getFashionByStatus);
router.patch(
  "/fashion_product/update/:id",
  authenticateToken,
  updateFashionById
);
router.delete(
  "/fashion_product/delete/:id",
  authenticateToken,
  deleteFashionById
);

export default router;
