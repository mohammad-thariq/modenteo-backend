import express from "express";
import {
  getCategoryWithSubcategory,
  getSubcategoryWithChildcategory,
} from "./menu.controller.js";

const router = express.Router();

router.get("/menu/categories/sub-categories",getCategoryWithSubcategory);
router.get("/menu/sub-categories/child-categories",getSubcategoryWithChildcategory);

export default router;
