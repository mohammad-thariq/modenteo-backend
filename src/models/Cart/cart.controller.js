//   import UserEnvironmentConfig from "../../config/env.config.js";
import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import {
  create,
  deleteCart,
  updateCart,
} from "./cart.service.js";

export const createCart = (req, res) => {
  const body = req.body;
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
};

export const getAllCart = (req, res) => {
  getDataByStatus(tableNames.CART, (err, results) => {
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

export const updateCartById = (req, res) => {
  const params = req.params;
  const body = req.body;
  getUploadFile(req, tableNames.CART, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    console.log(result, "result");
    body.image = result;
    updateCart(body, params.id, (err, results) => {
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

export const deleteCartById = (req, res) => {
  const data = req.params;
  deleteCart(data, (err, results) => {
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
