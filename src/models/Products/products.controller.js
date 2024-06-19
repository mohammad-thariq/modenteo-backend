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
  getByProductsbyBrandID,
} from "./products.service.js";
import { getValidateByName } from "../../middleware/validateName/validateName.js";
import { getBySubCategorySlug } from "../SubCategories/subCategories.service.js";
import { getByCategorySlug } from "../Categories/categories.service.js";
export const createProducts = (req, res) => {
  const body = req.body;
  const galleryUrls = req.body["gallery[]"];
  body.gallery = galleryUrls?.join();
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

export const getProductsBySubCategory = (req, res) => {
  const cat = req.params.cat;
  const subcat = req.params.subcat;
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
      getByProductsSubcatId(results?.id, (err, results) => {
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
      getByProductsbyCollectionID(results?.id, (err, results) => {
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
    getByProductsbyCollection(type, (err, results) => {
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
    getByProductsbyCategoryID(results?.id, (err, results) => {
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
  getByProductsSubcatId(id, (err, results) => {
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
  getByProductsbyCollectionID(id, (err, results) => {
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
