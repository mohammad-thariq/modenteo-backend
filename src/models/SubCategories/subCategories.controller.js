import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import {
  create,
  deleteSubCategory,
  getBySubCategoryId,
  getSubCategories,
  getSubCategoriesByStatus,
  updateSubCategory,
} from "./subCategories.service.js";

export const createSubCategory = (req, res) => {
  const body = req.body;
  const files = req.files;
  getUploadFile(files, tableNames.SUBCATEGORIES, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  });
};

export const getSubCategoryById = (req, res) => {
  const id = req.params.id;
  getBySubCategoryId(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "Record not found",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

export const getSubCategoryByStatus = (req, res) => {
  getSubCategoriesByStatus((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      sub_categories: results,
    });
  });
};

export const getAllSubCategories = (req, res) => {
  getSubCategories((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

export const updateSubCategoryById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  const files = req.files;
  getUploadFile(files, tableNames.SUBCATEGORIES, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    updateSubCategory(body, params.id, (err, results) => {
      console.log(results, "results");
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfully",
      });
    });
  });
};

export const deleteSubCategoryById = (req, res) => {
  const data = req.params;
  deleteSubCategory(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (!results.affectedRows) {
      return res.status(404).json({
        success: 0,
        message: "Record not found",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Sub categories deleted successfully",
    });
  });
};
