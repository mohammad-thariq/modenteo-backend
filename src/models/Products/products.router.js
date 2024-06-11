import express from "express";

import { authenticateToken } from "../../middleware/auth/authMiddleWare.js";
import {
  createProducts,
  deleteProductsById,
  getAllProducts,
  getProductsById,
  getProductsByStatus, getProductsBySlug, getProductsByCat, getCollectionProducts,
  updateProductsById, getProductsBySubCategory, getProductsBySubCat, getProductsByBrand, getProductsByCollection, getProductsByMainCategory
} from "./products.controller.js";

const router = express.Router();

router.post("/products/create", authenticateToken, createProducts);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductsById);
router.get("/category-products/:cat", getProductsByCat);
router.get("/collection-products/:id", getProductsByCollection);
router.get("/brand-products/:id", getProductsByBrand);
router.get("/maincategory-products/:id", getProductsByMainCategory);
router.get("/similar-products/:subcatid", getProductsBySubCat);
router.get("/products-slug/:slug", getProductsBySlug);
router.get("/collection-product/:type", getCollectionProducts);
router.get("/list/products", getProductsByStatus);
router.patch("/products/update/:id", authenticateToken, updateProductsById);
router.delete("/products/delete/:id", authenticateToken, deleteProductsById);
router.get("/products/:cat/:subcat", getProductsBySubCategory);

export default router;
