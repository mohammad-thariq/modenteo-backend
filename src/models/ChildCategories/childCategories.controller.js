import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import { getValidateByName } from "../../middleware/validateName/validateName.js";
import { getByCategoryId } from "../Categories/categories.service.js";
import { getBySubCategoryId } from "../SubCategories/subCategories.service.js";
import {
  create,
  deleteChildCategory,
  getByChildCategoryId,
  getChildCategories,
  updateChildCategory,
} from "./childCategories.service.js";

export const createChildCategory = (req, res) => {
  const body = req.body;
  getValidateByName(
    body.name,
    tableNames.CHILDCATEGORIES,
    async (err, nameAvailable) => {
      if (nameAvailable && nameAvailable.length > 0) {
        return await res.status(400).json({
          error: `${body.name} name Already Taken`,
        });
      } else {
        getUploadFile(body, tableNames.CATEGORIES, (err, result) => {
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
  getDataByStatus(tableNames.CHILDCATEGORIES, (err, results) => {
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
  const query = req.query;

  getPaginated(query, tableNames.CHILDCATEGORIES, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getChildCategories(result, async (err, childCategories) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }

      try {
        const childCategoriesWithDetails = await Promise.all(
          childCategories.map(async (childCategory) => {
            return new Promise((resolve, reject) => {
              getByCategoryId(childCategory.category_id, (err, category) => {
                if (err) {
                  console.log(err);
                  return reject({
                    error: "Database connection error",
                  });
                }
                if (!category) {
                  return reject({
                    error: "Category not found",
                  });
                }

                // Add the category to the child category
                childCategory.category = category;

                // Now fetch the sub-category
                getBySubCategoryId(
                  childCategory.sub_category_id,
                  (err, subCategory) => {
                    if (err) {
                      console.log(err);
                      return reject({
                        error: "Database connection error",
                      });
                    }
                    if (!subCategory) {
                      return reject({
                        error: "Sub-category not found",
                      });
                    }

                    // Add the sub-category to the child category
                    childCategory.sub_category = subCategory;
                    resolve(childCategory);
                  }
                );
              });
            });
          })
        );

        return res.status(200).json({
          child_categories: childCategoriesWithDetails,
          pagination: {
            totalPage: pagination,
            page: Number(query.page),
            limit: Number(query.limit),
          },
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  });
};

export const updateChildCategoryById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(body, tableNames.CATEGORIES, (err, result) => {
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
