import express from "express";
import {authenticateToken} from "../../middleware/auth/authMiddleWare.js";
import {
  createOrderItems,
  deleteOrderItemsById,
  getAllOrderItems,
  getOrderItemsById,
  updateOrderItemsById,
} from "./orderItems.controller.js";

const router = express.Router();

router.post("/order-items/create", authenticateToken, createOrderItems);
router.get("/order-items", authenticateToken, getAllOrderItems);
router.get("/order-items/:id", authenticateToken, getOrderItemsById);
router.patch(
  "/order-items/update/:id",
  authenticateToken,
  updateOrderItemsById
);
router.delete(
  "/order-items/delete/:id",
  authenticateToken,
  deleteOrderItemsById
);

export default router;
