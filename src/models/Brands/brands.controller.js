import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import {
  create,
  deleteBrand,
  getByBrandsId,
  getBrands,
  getBrandsByStatus,
  updateBrand,
} from "./brands.service.js";

export const createBrands = (req, res) => {
  const body = req.body;
  const files = req.files;
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
  getBrandsByStatus((err, results) => {
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
  getBrands((err, results) => {
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