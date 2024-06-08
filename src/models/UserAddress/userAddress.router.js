import express from "express";
import {authenticateToken} from "../../middleware/auth/authMiddleWare.js";
import {
  createUserAddress,
  deleteUserAddressById,
  getAllUserAddress,
  getUserAddressById,
  getUserAddressByUserId,
  updateUserAddressById,
} from "./userAddress.controller.js";

const router = express.Router();

router.post("/user_address/create", authenticateToken, createUserAddress);
router.get("/user_address", authenticateToken, getAllUserAddress);
router.get("/user_address/:id", authenticateToken, getUserAddressById);
router.get("/user/user_address/:id", authenticateToken, getUserAddressByUserId);
router.patch(
  "/user_address/update/:id",
  authenticateToken,
  updateUserAddressById
);
router.delete(
  "/user_address/delete/:id",
  authenticateToken,
  deleteUserAddressById
);

export default router;
