import { tableNames } from "../../../database/tables/index.js";
import { getUploadFile } from "../../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../../middleware/getDataByStatus/index.js";
import {
  create,
  deletePopularProduct,
  getByPopularProductId,
  getPopularProduct,
  updatePopularProduct,
} from "./popularProducts.service.js";

export const createPopularProduct = (req, res) => {
  const body = req.body;
  getUploadFile(
    req,
    tableNames.MANAGEWEBSITE.POPULARPRODUCTS,
    (err, result) => {
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
    }
  );
};

export const getPopularProductById = (req, res) => {
  const id = req.params.id;
  getByPopularProductId(id, (err, results) => {
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
      PopularProduct: results,
    });
  });
};

export const getPopularProductByStatus = (req, res) => {
  getDataByStatus(tableNames.MANAGEWEBSITE.POPULARPRODUCTS, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      PopularProduct: results,
    });
  });
};

export const getAllPopularProduct = (req, res) => {
  getPopularProduct((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      PopularProduct: results,
    });
  });
};

export const updatePopularProductById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(
    req,
    tableNames.MANAGEWEBSITE.POPULARPRODUCTS,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      body.image = result;
      updatePopularProduct(body, params.id, (err, results) => {
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
    }
  );
};

export const deletePopularProductById = (req, res) => {
  const data = req.params;
  deletePopularProduct(data, (err, results) => {
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
      message: "deleted successfully",
    });
  });
};
