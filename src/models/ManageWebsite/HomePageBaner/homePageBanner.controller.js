import { tableNames } from "../../../database/tables/index.js";
import { getUploadFile } from "../../../middleware/fileUpload/uploadfiles.js";
import { getDataByStatus } from "../../../middleware/getDataByStatus/index.js";
import { create, deleteBanner, getBanner, getByBannerId, updateBanner } from "./homePageBanner.service.js";

export const createBanner = (req, res) => {
  const body = req.body;
  getUploadFile(body, tableNames.MANAGEWEBSITE.BANNER, (err, result) => {
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

export const getBannerById = (req, res) => {
  const id = req.params.id;
  getByBannerId(id, (err, results) => {
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

export const getBannerByStatus = (req, res) => {
  getDataByStatus(tableNames.MANAGEWEBSITE.BANNER, (err, results) => {
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

export const getAllBanner = (req, res) => {
    getBanner((err, results) => {
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
  }

export const updateBannerById = (req, res) => {
  const params = req.params;
  const body = req.body;
  console.log(params, "params");
  getUploadFile(body, tableNames.MANAGEWEBSITE.BANNER, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    body.image = result;
    updateBanner(body, params.id, (err, results) => {
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

export const deleteBannerById = (req, res) => {
  const data = req.params;
  deleteBanner(data, (err, results) => {
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
