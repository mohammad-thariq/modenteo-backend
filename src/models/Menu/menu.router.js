import express from "express";
import {
  getCategoryWithSubcategory,
} from "./menu.controller.js";

const router = express.Router();

router.get("/menu/categories",getCategoryWithSubcategory);

export default router;
