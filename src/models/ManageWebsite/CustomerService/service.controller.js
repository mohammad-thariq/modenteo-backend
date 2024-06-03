import { tableNames } from "../../../database/tables/index.js";
import { getUploadFile } from "../../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../../middleware/getDataByStatus/index.js";
import {
  create,
  deleteCustomerService,
  getByCustomerServiceId,
  getCustomerService,
  updateCustomerService,
} from "./service.service.js";

export const createCustomerService = (req, res) => {
  const body = req.body;
  getUploadFile(
    body,
    tableNames.MANAGEWEBSITE.CUSTOMERSERVICE,
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

export const getCustomerServiceById = (req, res) => {
  const id = req.params.id;
  getByCustomerServiceId(id, (err, results) => {
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
      service: results,
    });
  });
};

export const getCustomerServiceByStatus = (req, res) => {
  getDataByStatus(tableNames.MANAGEWEBSITE.CUSTOMERSERVICE, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      service: results,
    });
  });
};

export const getAllCustomerService = (req, res) => {
  getCustomerService((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      service: results,
    });
  });
};

export const updateCustomerServiceById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(
    body,
    tableNames.MANAGEWEBSITE.CUSTOMERSERVICE,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      body.image = result;
      updateCustomerService(body, params.id, (err, results) => {
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

export const deleteCustomerServiceById = (req, res) => {
  const data = req.params;
  deleteCustomerService(data, (err, results) => {
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
