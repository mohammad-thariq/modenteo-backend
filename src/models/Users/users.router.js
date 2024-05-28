import express from "express";
import {
  createUser,
  login,
  getUserById,
  getAllUsers,
  updateUsers,
  deleteUserById,
  getUserByEmail,
} from "./users.controller.js";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/user/:id", authenticateToken, getUserById);
router.get("/user/:email", getUserByEmail);
router.get("/users", authenticateToken, getAllUsers);
router.patch("/user/:id", authenticateToken, updateUsers);
router.delete("/user/:id", authenticateToken, deleteUserById);

export default router;
