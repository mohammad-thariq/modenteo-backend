import express from "express";
import authenticateToken from "../../../middleware/auth/authMiddleWare.js";
import {
  createDiscount,
  deleteDiscountById,
  getAllDiscounts,
  getDiscountById,
  getDiscountByStatus,
  updateDiscountById,
} from "./discountBanner.controller.js";

const router = express.Router();

router.post("/discount_banner/create", authenticateToken, createDiscount);
router.get("/discount_banner", authenticateToken, getAllDiscounts);
router.get("/discount_banner/:id", authenticateToken, getDiscountById);
router.get("/list/discount_banner", authenticateToken, getDiscountByStatus);
router.patch(
  "/discount_banner/update/:id",
  authenticateToken,
  updateDiscountById
);
router.delete(
  "/discount_banner/delete/:id",
  authenticateToken,
  deleteDiscountById
);

export default router;
