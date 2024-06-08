import express from "express";
import {authenticateToken} from "../../../middleware/auth/authMiddleWare.js";
import {
  createCustomerService,
  deleteCustomerServiceById,
  getAllCustomerService,
  getCustomerServiceById,
  getCustomerServiceByStatus,
  updateCustomerServiceById,
} from "./service.controller.js";

const router = express.Router();

router.post("/service/create", authenticateToken, createCustomerService);
router.get("/service", authenticateToken, getAllCustomerService);
router.get("/service/:id", authenticateToken, getCustomerServiceById);
router.get("/list/service", authenticateToken, getCustomerServiceByStatus);
router.patch(
  "/service/update/:id",
  authenticateToken,
  updateCustomerServiceById
);
router.delete(
  "/service/delete/:id",
  authenticateToken,
  deleteCustomerServiceById
);

export default router;
