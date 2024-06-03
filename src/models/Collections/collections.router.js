import express from "express";
import {
  createcollections,
  deletecollectionsById,
  getAllcollections,
  getBrandByStatus,
  getcollectionsById,
  updatecollectionsById,
} from "./collections.controller.js";
import authenticateToken from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/collections/create", authenticateToken, createcollections);
router.get("/collections", authenticateToken, getAllcollections);
router.get("/collections/:id", authenticateToken, getcollectionsById);
router.get("/list/collections", authenticateToken, getBrandByStatus);
router.patch("/collections/update/:id", authenticateToken, updatecollectionsById);
router.delete("/collections/delete/:id", authenticateToken, deletecollectionsById);

export default router;
