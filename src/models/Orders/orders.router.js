import express from "express";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";
import {
  createOrders,
  deleteOrdersById,
  getAllOrders,
  getOrdersById,
  updateOrdersById,
} from "./orders.controller.js";

const router = express.Router();

router.post("/orders/create", authenticateToken, createOrders);
router.get("/orders", authenticateToken, getAllOrders);
router.get("/orders/:id", authenticateToken, getOrdersById);
router.patch("/orders/update/:id", authenticateToken, updateOrdersById);
router.delete("/orders/delete/:id", authenticateToken, deleteOrdersById);

export default router;
