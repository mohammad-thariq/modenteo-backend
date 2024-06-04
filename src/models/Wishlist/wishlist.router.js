import express from "express";
import {
  createWishlist,
  deleteWishlistById,
  getAllWishlist,
  updateWishlistById,
} from "./wishlist.controller.js";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/wishlist/create", authenticateToken, createWishlist);
router.delete("/wishlist/delete/:id", authenticateToken, deleteWishlistById);
router.get("/wishlist", authenticateToken, getAllWishlist);

export default router;
