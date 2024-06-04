import { tableNames } from "../../../database/tables/index.js";
import { getUploadFile } from "../../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../../middleware/getDataByStatus/index.js";
import {
  create,
  deleteFashion,
  getByFashionId,
  getFashion,
  updateFashion,
} from "./fashions.service.js";

export const createFashion = (req, res) => {
  const body = req.body;
  getUploadFile(
    req,
    tableNames.MANAGEWEBSITE.FASHIONPRODUCTS,
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

export const getFashionById = (req, res) => {
  const id = req.params.id;
  getByFashionId(id, (err, results) => {
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

export const getFashionByStatus = (req, res) => {
  getDataByStatus(tableNames.MANAGEWEBSITE.FASHIONPRODUCTS, (err, results) => {
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

export const getAllFashions = (req, res) => {
  getFashion((err, results) => {
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

export const updateFashionById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(
    req,
    tableNames.MANAGEWEBSITE.FASHIONPRODUCTS,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      body.image = result;
      updateFashion(body, params.id, (err, results) => {
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

export const deleteFashionById = (req, res) => {
  const data = req.params;
  deleteFashion(data, (err, results) => {
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
