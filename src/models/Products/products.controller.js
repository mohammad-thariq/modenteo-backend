import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import { getByCollectionsSlug } from "../Collections/collections.service.js";
import {
  create,
  deleteProducts,
  getByProductsId,
  getByProductsSlug,
  getByProductsbyCollection,
  getByProductsbyCollectionID,
  getProducts,
  updateProducts,
  getByProductsSubcatId,
  getByProductsbyCategoryID,
  getByProductsbyBrandID, getVariantsbyProductID, createVariant, updateVariant, deleteVariant
} from "./products.service.js";
import { getValidateByName } from "../../middleware/validateName/validateName.js";
import { getBySubCategorySlug } from "../SubCategories/subCategories.service.js";
import { getByCategorySlug } from "../Categories/categories.service.js";


export const createProducts = (req, res) => {
  const body = req.body;
  const galleryUrls = req.body["gallery[]"];
  console.log(galleryUrls, 'galleryUrls');
  if (galleryUrls) {
    // Ensure galleryUrls is an array
    const galleryArray = Array.isArray(galleryUrls) ? galleryUrls : [galleryUrls];
    body.gallery = galleryArray.join();
  } else {
    body.gallery = '';
  }

  getValidateByName(
    body.name,
    tableNames.PRODUCTS,
    async (err, nameAvailable) => {
      if (nameAvailable && nameAvailable.length > 0) {
        return await res.status(400).json({
          error: `${body.name} name Already Taken`,
        });
      } else {
        getUploadFile(req, tableNames.PRODUCTS, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          }
          body.image = result;
          create(body, async (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: "Database connection error",
              });
            }
            let productID = results.insertId;

            // Create Product Variants
            try {
              let product_details = [];
              // Collect product details from the request body
              for (let i = 0; body[`product_details[${i}][product_quantity]`]; i++) {
                const productDetail = {
                  product_quantity: body[`product_details[${i}][product_quantity]`],
                  product_price: body[`product_details[${i}][product_price]`],
                  offer_price: body[`product_details[${i}][offer_price]`],
                  product_size: body[`product_details[${i}][product_size]`],
                };
                product_details.push(productDetail);
              }

              // Process each product detail
              await Promise.all(
                product_details.map(async (item) => {
                  const data = {
                    product_id: productID,
                    product_size: item.product_size,
                    product_quantity: item.product_quantity,
                    product_price: item.product_price,
                    offer_price: item.offer_price,
                  };
                  return new Promise((resolve, reject) => {
                    createVariant(data, (err, results) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(results);
                      }
                    });
                  });
                })
              );

              // Successfully created the product and variants
              return res.status(200).json({
                success: 1,
                data: "Product Created Successfully",
              });

            } catch (error) {
              return res.status(500).json({
                success: 0,
                error: error.message,
              });
            }
          });

        });
      }
    }
  );
};

export const getProductsBySubCategory = (req, res) => {
  const cat = req.params.cat;
  const subcat = req.params.subcat;
  const filters = req.body;
  getByCategorySlug(cat, (err, results) => {
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
    getBySubCategorySlug(results?.id, subcat, (err, results) => {
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
      getByProductsSubcatId(results?.id, filters, (err, results) => {
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
  });
};

export const getNewCollectionProduct = (req, res) => {
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


export const getSeasonCollectionProduct = (req, res) => {
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

export const getCollectionProducts = (req, res) => {
  const id = req.params.type;
  const filters = req.body
  let type = "";
  switch (id) {
    case "new-arrivals":
      type = "new_arrival";
      break;
    case "best-selling":
      type = "best_product";
      break;
    case "top-products":
      type = "top_product";
      break;
    case "featured-products":
      type = "featured_product";
      break;
    default:
      type = "get-collection";
  }
  if (type === "get-collection") {
    getByCollectionsSlug(id, (err, results) => {
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
      getByProductsbyCollectionID(results?.id, filters, (err, results) => {
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
          data: results,
        });
      });
    });
  } else {
    getByProductsbyCollection(type, filters, (err, results) => {
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
        data: results,
      });
    });
  }
};

export const getProductsByCat = (req, res) => {
  const id = req.params.cat;
  const filters = req.body;
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
    getByProductsbyCategoryID(results?.id, filters, (err, results) => {
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
        data: results,
      });
    });
  });
};

export const getProductsBySlug = (req, res) => {
  const id = req.params.slug;
  getByProductsSlug(id, (err, results) => {
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

export const getProductsBySubCat = (req, res) => {
  const id = req.params.subcatid;
  getByProductsSubcatId(id, null, (err, results) => {
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

export const getProductsByCollection = (req, res) => {
  const id = req.params.id;
  const filters = req.body;
  getByProductsbyCollectionID(id, filters, (err, results) => {
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

export const getProductsByBrand = (req, res) => {
  const id = req.params.id;
  getByProductsbyBrandID(id, (err, results) => {
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

export const getProductsByMainCategory = (req, res) => {
  const id = req.params.id;
  getByProductsbyCategoryID(id, (err, results) => {
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
              resolve(product);
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
  getUploadFile(req, tableNames.PRODUCTS, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    const galleryUrls = req.body["gallery[]"];
    body.gallery = galleryUrls?.join();
    updateProducts(body, params.id, (err, results) => {
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


// Variants 

export const getVariants = (req, res) => {
  const productID = req.params.productID;
  getVariantsbyProductID(productID, (err, results) => {
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
    getByProductsId(productID, (err, productdetails) => {
      return res.status(200).json({
        variants: results,
        products: productdetails,
      });
    });

  });
}

export const createVariants = (req, res) => {
  const body = req.body;
  createVariant(body, (err, results) => {
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


export const updateVariants = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  updateVariant(body, params.id, (err, results) => {
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
};

export const deleteVariants = (req, res) => {
  const data = req.params;
  deleteVariant(data, (err, results) => {
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
      message: "Variant deleted successfully",
    });
  });
};
