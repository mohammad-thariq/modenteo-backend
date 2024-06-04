import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getValidateByName } from "../../middleware/validateName/validateName.js";
import {
  create,
  deleteSubCategory,
  getBySubCategoryId,
  getSubCategories,
  getSubCategoriesByStatus,
  updateSubCategory,
  getSubCategoryByCatgoryId,
} from "./subCategories.service.js";
import {
  getByCategoryId,
  getByCategorySlug,
} from "../Categories/categories.service.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";

export const createSubCategory = (req, res) => {
  const body = req.body;
  getValidateByName(
    body.name,
    tableNames.SUBCATEGORIES,
    async (err, nameAvailable) => {
      if (nameAvailable && nameAvailable.length > 0) {
        return await res.status(400).json({
          error: `${body.name} name Already Taken`,
        });
      } else {
        getUploadFile(req, tableNames.SUBCATEGORIES, (err, result) => {
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

export const getSubCategoryByCategoryId = (req, res) => {
  const id = req.params.id;
  getByCategorySlug(id, (err, results) => {
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
    getSubCategoryByCatgoryId(results?.id, (err, results) => {
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
  });
};

export const getSubCategoryByStatus = (req, res) => {
  getDataByStatus(tableNames.SUBCATEGORIES, (err, results) => {
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
  const query = req.query;

  getPaginated(query, tableNames.SUBCATEGORIES, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }

    // Fetch subcategories
    getSubCategories(result, async (err, subCategories) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      // For each subcategory, fetch the associated category
      try {
        const subCategoriesWithCategories = await Promise.all(
          subCategories.map(async (subCategory) => {
            return new Promise((resolve, reject) => {
              getByCategoryId(subCategory.category_id, (err, category) => {
                if (err) {
                  console.log(err);
                  return reject({
                    error: "Database connection error",
                  });
                }
                // if (!category) {
                //   return reject({
                //     error: "Record not found",
                //   });
                // }

                // Embed category data into the subcategory object
                subCategory.category = category;
                resolve(subCategory);
              });
            });
          })
        );

        return res.status(200).json({
          sub_categories: subCategoriesWithCategories,
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

export const updateSubCategoryById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(req, tableNames.SUBCATEGORIES, (err, result) => {
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
