import express from "express";

import authenticateToken from "../../middleware/auth/authMiddleWare.js";
import {
  createProducts,
  deleteProductsById,
  getAllProducts,
  getProductsById,
  getProductsByStatus,
  updateProductsById,getProductsBySubCategory
} from "./products.controller.js";

const router = express.Router();

router.post("/products/create", authenticateToken, createProducts);
router.get("/products", authenticateToken, getAllProducts);
router.get("/products/:id", authenticateToken, getProductsById);
router.get("/list/products", authenticateToken, getProductsByStatus);
router.patch("/products/update/:id", authenticateToken, updateProductsById);
router.delete("/products/delete/:id", authenticateToken, deleteProductsById);
router.get("/category/products", getProductsBySubCategory);

export default router;
