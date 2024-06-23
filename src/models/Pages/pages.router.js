import express from "express";
import {
  createPages,
  deletePagesById,
  getPageByStatus, getAllPages, updatePagesById, getPagesById,getPagesBySlug
} from "./pages.controller.js";
import { authenticateToken } from "../../middleware/auth/authMiddleWare.js";

const router = express.Router();

router.post("/pages/create", authenticateToken, createPages);
router.get("/pages", authenticateToken, getAllPages);
router.get("/pages/:id", getPagesById);
router.get("/page/:slug", getPagesBySlug);
router.get("/list/pages", getPageByStatus);
router.patch("/pages/update/:id", authenticateToken, updatePagesById);
router.delete("/pages/delete/:id", authenticateToken, deletePagesById);

export default router;
