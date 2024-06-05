//   import UserEnvironmentConfig from "../../config/env.config.js";
import { tableNames } from "../../database/tables/index.js";
import { getUploadFile } from "../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import {
  create,
  deleteCart,
  updateCart,
  get
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
  const params = req.params;
  get(params?.userID, (err, results) => {
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

export const updateCartById = (req, res) => {
  const params = req.params;
  const body = req.body;
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
};

export const deleteCartById = (req, res) => {
  const data = req.params;
  deleteCart(data?.id, (err, results) => {
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
