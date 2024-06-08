import express from "express";
import {authenticateToken} from "../../middleware/auth/authMiddleWare.js";
import {
  createOrders,
  deleteOrdersById,
  getAllDeclinedOrders,
  getAllDeliveredOrders,
  getAllDispatchedOrders,
  getAllOrders,
  getAllPendingOrders,
  getAllProcessOrders,
  getOrdersById,
  getOrdersByUserID,
  updateOrdersById,
} from "./orders.controller.js";

const router = express.Router();

router.post("/orders/create", authenticateToken, createOrders);
router.get("/orders", authenticateToken, getAllOrders);
router.get("/pending-order", authenticateToken, getAllPendingOrders);
router.get("/pregress-order", authenticateToken, getAllProcessOrders);
router.get("/dispatched-order", authenticateToken, getAllDispatchedOrders);
router.get("/delivered-order", authenticateToken, getAllDeliveredOrders);
router.get("/declined-order", authenticateToken, getAllDeclinedOrders);
router.get("/orders/:id", authenticateToken, getOrdersById);
router.get("/orders/user/:id", authenticateToken, getOrdersByUserID);
router.patch("/orders/update/:id", authenticateToken, updateOrdersById);
router.delete("/orders/delete/:id", authenticateToken, deleteOrdersById);

export default router;
