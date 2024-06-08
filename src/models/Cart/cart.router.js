import express from "express";
import {
  createCart,
  deleteCartById,
  getAllCart,
  updateCartById,
} from "./cart.controller.js";
import {authenticateToken} from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/cart/create", authenticateToken, createCart);
router.patch("/cart/update/:id", authenticateToken, updateCartById);
router.delete("/cart/delete/:id", authenticateToken, deleteCartById);
router.get("/cart/:userID", authenticateToken, getAllCart);

export default router;
