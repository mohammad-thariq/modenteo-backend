import express from "express";
import {
  getCategoryWithSubcategory,
  getSeasonCollections, getNew
} from "./menu.controller.js";

const router = express.Router();

router.get("/menu/categories/sub-categories", getCategoryWithSubcategory);
router.get("/menu/seasons", getSeasonCollections);
router.get("/menu/new-collections", getNew);

export default router;
