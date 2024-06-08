import express from "express";
import {
  createCollections,
  deleteCollectionsById,
  getCollectionByStatus, getAllCollections, updateCollectionsById, getCollectionsById
} from "./collections.controller.js";
import {authenticateToken} from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/collections/create", authenticateToken, createCollections);
router.get("/collections", authenticateToken, getAllCollections);
router.get("/collections/:id", authenticateToken, getCollectionsById);
router.get("/list/collections", getCollectionByStatus);
router.patch("/collections/update/:id", authenticateToken, updateCollectionsById);
router.delete("/collections/delete/:id", authenticateToken, deleteCollectionsById);

export default router;
