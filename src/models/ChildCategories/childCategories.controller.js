import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getValidateByName } from "../../middleware/validateName/validateName.js";
import {
  create,
  deleteChildCategory,
  getByChildCategoryId,
  getChildCategories,
  getChildCategoriesByStatus,
  updateChildCategory,
} from "./childCategories.service.js";

export const createChildCategory = (req, res) => {
  const body = req.body;
  const files = req.files;
  getValidateByName(
    body.name,
    tableNames.CHILDCATEGORIES,
    async (err, nameAvailable) => {
      if (nameAvailable && nameAvailable.length > 0) {
        return await res.status(400).json({
          error: `${body.name} name Already Taken`,
        });
      } else {
        getUploadFile(files, tableNames.CATEGORIES, (err, result) => {
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
      }
    }
  );
};

export const getChildCategoryById = (req, res) => {
  const id = req.params.id;
  getByChildCategoryId(id, (err, results) => {
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

export const getChildCategoryByStatus = (req, res) => {
  getChildCategoriesByStatus((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      child_categories: results,
    });
  });
};

export const getAllChildCategories = (req, res) => {
  getChildCategories((err, results) => {
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

export const updateChildCategoryById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  const files = req.files;
  getUploadFile(files, tableNames.CATEGORIES, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    updateChildCategory(body, params.id, (err, results) => {
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

export const deleteChildCategoryById = (req, res) => {
  const data = req.params;
  deleteChildCategory(data, (err, results) => {
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
      message: "Child categories deleted successfully",
    });
  });
};
