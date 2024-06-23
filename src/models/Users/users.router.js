import express from "express";
import {
  createUser,
  login,
  changPassword,
  getUserById,
  getAllUsers,
  updateUsers,
  deleteUserById,
  getUserByEmail,
  getUserByType,
  getUserDashboard, getAdminDashboard
} from "./users.controller.js";
import {
  authenticateToken,
  checkToken,
} from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/forgot-password", changPassword);
router.get("/user/:email", getUserByEmail);
router.get("/user/type/:type", authenticateToken, getUserByType);
router.get("/user/:id", authenticateToken, getUserById);
router.get("/users", authenticateToken, getAllUsers);
router.patch("/user/:id", authenticateToken, updateUsers);
router.delete("/user/:id", authenticateToken, deleteUserById);
router.get("/user/dashboard/:id", getUserDashboard);
router.get("/admin/dashboard", getAdminDashboard);

// Route to check token validity
router.get("/validate-token", checkToken);

export default router;
