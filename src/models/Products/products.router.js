import express from "express";

import { authenticateToken } from "../../middleware/auth/authMiddleWare.js";
import {
  createProducts,
  deleteProductsById,
  getAllProducts,
  getProductsById,
  getProductsByStatus,
  getProductsBySlug,
  getProductsByCat,
  getCollectionProducts,
  updateProductsById,
  getProductsBySubCategory,
  getProductsBySubCat,
  getProductsByBrand,
  getProductsByCollection,
  getProductsByMainCategory, getVariants, createVariants, createorUpdateVariants, updateVariants, deleteVariants, getVariantSizes,getProductVariants, getProductsList, createVariantSizes, deleteVariantSizes, updateVariantSizes
} from "./products.controller.js";

const router = express.Router();

router.post("/products/create", authenticateToken, createProducts);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductsById);
router.post("/category-products/:cat", getProductsByCat);
router.post("/collection-products/:id", getProductsByCollection);
router.get("/brand-products/:id", getProductsByBrand);
router.get("/maincategory-products/:id", getProductsByMainCategory);
router.get("/similar-products/:subcatid", getProductsBySubCat);
router.get("/products-slug/:slug", getProductsBySlug);
router.post("/collection-product/:type", getCollectionProducts);
router.get("/list/products", getProductsByStatus);
router.patch("/products/update/:id", authenticateToken, updateProductsById);
router.delete("/products/delete/:id", authenticateToken, deleteProductsById);
router.post("/products/:cat/:subcat", getProductsBySubCategory);
router.post("/products-variants/:id", createorUpdateVariants);

// Variants
router.get("/variants/:productID", getVariants);
router.post("/variants/create", createVariants);
router.patch("/variants/update/:id", updateVariants);
router.delete("/variants/delete/:id", deleteVariants);

router.get("/products-list", getProductsList);
router.get("/get-prd-variants/:prdid", getProductVariants);

// Variant Sizes
router.get("/variants-sizes", getVariantSizes);
router.post("/variants-sizes/create", createVariantSizes);
router.patch("/variants-sizes/update/:id", updateVariantSizes);
router.delete("/variants-sizes/delete/:id", deleteVariantSizes);

export default router;
