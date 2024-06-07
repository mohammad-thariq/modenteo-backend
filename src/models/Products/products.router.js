import express from "express";

import authenticateToken from "../../middleware/auth/authMiddleWare.js";
import {
  createProducts,
  deleteProductsById,
  getAllProducts,
  getProductsById,
  getProductsByStatus, getProductsBySlug, getProductsByCat, getCollectionProducts,
  updateProductsById, getProductsBySubCategory
} from "./products.controller.js";

const router = express.Router();

router.post("/products/create", authenticateToken, createProducts);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductsById);
router.get("/products-slug/:slug", getProductsBySlug);
router.get("/category-products/:cat", getProductsByCat);
router.get("/collection-product/:type", getCollectionProducts);
router.get("/list/products", getProductsByStatus);
router.patch("/products/update/:id", authenticateToken, updateProductsById);
router.delete("/products/delete/:id", authenticateToken, deleteProductsById);
router.get("/products/:cat/:subcat", getProductsBySubCategory);

export default router;
