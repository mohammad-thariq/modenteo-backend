import { tableNames } from "../../../database/tables/index.js";
import { getUploadFile } from "../../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../../middleware/getDataByStatus/index.js";
import {
  create,
  deleteDiscount,
  getByDiscountId,
  getDiscount,
  updateDiscount,
} from "./discountBanner.service.js";

export const createDiscount = (req, res) => {
  const body = req.body;
  getUploadFile(req, tableNames.MANAGEWEBSITE.DISCOUNTBANNER, (err, result) => {
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

export const getDiscountById = (req, res) => {
  const id = req.params.id;
  getByDiscountId(id, (err, results) => {
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
      banner: results,
    });
  });
};

export const getDiscountByStatus = (req, res) => {
  getDataByStatus(tableNames.MANAGEWEBSITE.DISCOUNTBANNER, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      banner: results,
    });
  });
};

export const getAllDiscounts = (req, res) => {
  getDiscount((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      banner: results,
    });
  });
};

export const updateDiscountById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(req, tableNames.MANAGEWEBSITE.DISCOUNTBANNER, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    updateDiscount(body, params.id, (err, results) => {
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

export const deleteDiscountById = (req, res) => {
  const data = req.params;
  deleteDiscount(data, (err, results) => {
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
