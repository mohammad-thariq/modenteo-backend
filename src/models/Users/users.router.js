import express from "express";
import {
  createUser,
  login,
  getUserById,
  getAllUsers,
  updateUsers,
  deleteUserById,
  getUserByEmail,
  getUserByType,
} from "./users.controller.js";
import {authenticateToken, checkToken} from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/user/:email", getUserByEmail);
router.get("/user/:id", authenticateToken, getUserById);
router.get("/user/:type", getUserByType);
router.get("/users", authenticateToken, getAllUsers);
router.patch("/user/:id", authenticateToken, updateUsers);
router.delete("/user/:id", authenticateToken, deleteUserById);

// Route to check token validity
router.get('/validate-token', checkToken);

export default router;
