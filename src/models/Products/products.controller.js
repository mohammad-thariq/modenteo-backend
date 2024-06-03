import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import {
  create,
  deleteProducts,
  getByProductsId,
  getProducts,
  updateProducts,
} from "./products.service.js";

export const createProducts = (req, res) => {
  const body = req.body;
  getValidateByName(
    body.name,
    tableNames.PRODUCTS,
    async (err, nameAvailable) => {
      if (nameAvailable && nameAvailable.length > 0) {
        return await res.status(400).json({
          error: `${body.name} name Already Taken`,
        });
      } else {
        getUploadFile(body, tableNames.PRODUCTS, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          }
          body.image = result;
          create(body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: "Database connection error",
              });
            }
            return res.status(200).json({
              products: results,
            });
          });
        });
      }
    }
  );
};

export const getProductsById = (req, res) => {
  const id = req.params.id;
  getByProductsId(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database connection error",
      });
    }
    if (!results) {
      return res.status(404).json({
        message: "Record not found",
      });
    }
    return res.status(200).json({
      products: results,
    });
  });
};

export const getProductsByStatus = (req, res) => {
  getDataByStatus(tableNames.PRODUCTS, async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      products: results,
    });
  });
};

export const getAllProducts = (req, res) => {
  const query = req.query;
  getPaginated(query, tableNames.PRODUCTS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getProducts(result, async (err, products) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }

      try {
        const productsWithDetails = await Promise.all(
          products.map(async (product) => {
            return new Promise((resolve, reject) => {
              // Fetch category details
              getByCategoryId(product.category_id, (err, category) => {
                product.category = category;

                // Fetch sub-category details
                getBySubCategoryId(
                  product.sub_category_id,
                  (err, subCategory) => {
                    product.sub_category = subCategory;

                    // Fetch child-category details
                    getChildCategoryById(
                      product.child_category_id,
                      (err, childCategory) => {
                        product.child_category = childCategory;

                        // Fetch brand details
                        getBrandsById(product.brand_id, (err, brand) => {
                          product.brand = brand;

                          // Resolve the product with all details
                          resolve(product);
                        });
                      }
                    );
                  }
                );
              });
            });
          })
        );

        return res.status(200).json({
          products: productsWithDetails,
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

export const updateProductsById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(body, tableNames.PRODUCTS, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    updateProducts(body, params.id, (err, results) => {
      console.log(results, "results");
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        message: "Updated successfully",
      });
    });
  });
};

export const deleteProductsById = (req, res) => {
  const data = req.params;
  deleteProducts(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database connection error",
      });
    }
    if (!results.affectedRows) {
      return res.status(404).json({
        message: "Record not found",
      });
    }
    return res.status(200).json({
      message: "Child categories deleted successfully",
    });
  });
};
