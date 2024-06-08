import express from "express";
import {
  createWishlist,
  deleteWishlistById,
  getAllWishlist,
} from "./wishlist.controller.js";
import {authenticateToken} from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/wishlist/create", authenticateToken, createWishlist);
router.delete("/wishlist/delete/:id", authenticateToken, deleteWishlistById);
router.get("/wishlist/:userID", authenticateToken, getAllWishlist);

export default router;
