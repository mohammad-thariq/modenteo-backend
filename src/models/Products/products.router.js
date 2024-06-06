import express from "express";

import authenticateToken from "../../middleware/auth/authMiddleWare.js";
import {
  createProducts,
  deleteProductsById,
  getAllProducts,
  getProductsById,
  getProductsByStatus, getProductsBySlug, getCollectionProducts,
  updateProductsById, getProductsBySubCategory
} from "./products.controller.js";

const router = express.Router();

router.post("/products/create", authenticateToken, createProducts);
router.get("/products", authenticateToken, getAllProducts);
router.get("/products/:id", authenticateToken, getProductsById);
router.get("/products-slug/:slug", authenticateToken, getProductsBySlug);
router.get("/collection-product/:type", getCollectionProducts);
router.get("/list/products", authenticateToken, getProductsByStatus);
router.patch("/products/update/:id", authenticateToken, updateProductsById);
router.delete("/products/delete/:id", authenticateToken, deleteProductsById);
router.get("/products/:cat/:subcat", getProductsBySubCategory);

export default router;
