import { tableNames } from "../../../database/tables/index.js";
import { getUploadFile } from "../../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../../middleware/getDataByStatus/index.js";
import {
  create,
  deleteSpotLight,
  getBySpotLightId,
  getSpotLight,
  updateSpotLight,
} from "./sportLight.service.js";

export const createSpotLight = (req, res) => {
  const body = req.body;
  getUploadFile(req, tableNames.MANAGEWEBSITE.SPOTLIGHT, (err, result) => {
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

export const getSpotLightById = (req, res) => {
  const id = req.params.id;
  getBySpotLightId(id, (err, results) => {
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
      spot_light: results,
    });
  });
};

export const getSpotLightByStatus = (req, res) => {
  getDataByStatus(tableNames.MANAGEWEBSITE.SPOTLIGHT, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      spot_light: results,
    });
  });
};

export const getAllSpotLight = (req, res) => {
  getSpotLight((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      spot_light: results,
    });
  });
};

export const updateSpotLightById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(req, tableNames.MANAGEWEBSITE.SPOTLIGHT, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    updateSpotLight(body, params.id, (err, results) => {
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

export const deleteSpotLightById = (req, res) => {
  const data = req.params;
  deleteSpotLight(data, (err, results) => {
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
