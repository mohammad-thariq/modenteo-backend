//   import UserEnvironmentConfig from "../../config/env.config.js";
import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import { getValidateByName } from "../../middleware/validateName/validateName.js";
import {
  create,
  deleteCategory,
  getByCategoryId,
  getCategories,
  updateCategory,
  getCategoriesWithSubcategory,
} from "./categories.service.js";

export const createCategory = (req, res) => {
  const body = req.body;
  const files = req.files;
  getValidateByName(
    body.name,
    tableNames.CATEGORIES,
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

export const getCategoryByStatus = (req, res) => {
  getDataByStatus(tableNames.CATEGORIES, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      categories: results,
    });
  });
};

export const getCategoryWithSubcategory = (req, res) => {
  getCategoriesWithSubcategory(async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    let response = {};

    for (const cat of results) {
      if (response[cat?.id]) {
        response[cat?.id].subCategory.push({
          id: cat?.subcategoryID,
          name: cat?.subcatName,
          slug: cat?.subcatSlug,
        });
      } else {
        response[cat?.id] = {
          id: cat?.id,
          categoryName: cat?.name,
          categorySlug: cat?.slug,
          image: cat?.image,
          isOpen: false,
          subCategory: [
            {
              id: cat?.subcategoryID,
              name: cat?.subcatName,
              slug: cat?.subcatSlug,
            },
          ],
        };
      }
    }
    const responseArray = Object.values(response);
    return res.status(200).json({
      response: responseArray,
    });
  });
};

export const getCategoryById = (req, res) => {
  const id = req.params.id;
  getByCategoryId(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    if (!results) {
      return res.status(404).json({
        error: "Record not found",
      });
    }
    return res.status(200).json({
      categories: results,
    });
  });
};

export const getAllCategories = (req, res) => {
  const query = req.query;
  getPaginated(query, tableNames.CATEGORIES, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getCategories(result, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        categories: results,
        pagination: {
          totalPage: pagination,
          page: Number(query.page),
          limit: Number(query.limit),
        },
      });
    });
  });
};

export const updateCategoryById = (req, res) => {
  const params = req.params;
  const body = req.body;
  const files = req.files;
  getUploadFile(files, tableNames.CATEGORIES, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    console.log(result, "result");
    body.image = result;
    updateCategory(body, params.id, (err, results) => {
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

export const deleteCategoryById = (req, res) => {
  const data = req.params;
  deleteCategory(data, (err, results) => {
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
      message: "categories deleted successfully",
    });
  });
};
