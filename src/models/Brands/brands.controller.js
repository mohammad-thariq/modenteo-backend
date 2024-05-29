import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import { getValidateByName } from "../../middleware/validateName/validateName.js";
import {
  create,
  deleteBrand,
  getByBrandsId,
  getBrands,
  updateBrand,
} from "./brands.service.js";

export const createBrands = (req, res) => {
  const body = req.body;
  const files = req.files;
  getValidateByName(
    body.name,
    tableNames.BRANDS,
    async (err, nameAvailable) => {
      if (nameAvailable && nameAvailable.length > 0) {
        return await res.status(400).json({
          error: `${body.name} name Already Taken`,
        });
      } else {
        getUploadFile(files, tableNames.BRANDS, (err, result) => {
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

export const getBrandsById = (req, res) => {
  const id = req.params.id;
  getByBrandsId(id, (err, results) => {
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

export const getBrandByStatus = (req, res) => {
  getDataByStatus(tableNames.BRANDS, (err, results) => {
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

export const getAllBrands = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.BRANDS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getBrands(result, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        brands: results,
        pagination: {
          totalPage: pagination,
          page: Number(query.page),
          limit: Number(query.limit),
        },
      });
    });
  });
};

export const updateBrandsById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  const files = req.files;
  getUploadFile(files, tableNames.BRANDS, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    updateBrand(body, params.id, (err, results) => {
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

export const deleteBrandsById = (req, res) => {
  const data = req.params;
  deleteBrand(data, (err, results) => {
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
      message: "Brands deleted successfully",
    });
  });
};
