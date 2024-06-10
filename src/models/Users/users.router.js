import express from "express";
import {
  createUser,
  login,
  getUserById,
  getAllUsers,
  updateUsers,
  deleteUserById,
  getUserByEmail,
  getUserByType, getUserDashboard
} from "./users.controller.js";
import { authenticateToken, checkToken } from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/user/:email", getUserByEmail);
router.get("/user/:type", authenticateToken, getUserByType);
router.get("/user/:id", authenticateToken, getUserById);
router.get("/users", authenticateToken, getAllUsers);
router.patch("/user/:id", authenticateToken, updateUsers);
router.delete("/user/:id", authenticateToken, deleteUserById);
router.get("/user/dashboard/:id", getUserDashboard);

// Route to check token validity
router.get('/validate-token', checkToken);

export default router;
