import { tableNames } from "../../database/tables/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import {
  create,
  deleteUserAddress,
  getByUserAddressId,
  getByUserAddressUserId,
  getUserAddress,
  updateUserAddress,
} from "./userAddress.service.js";

export const createUserAddress = (req, res) => {
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

export const getUserAddressById = (req, res) => {
  const id = req.params.id;
  getByUserAddressId(id, (err, results) => {
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
      user_address: results,
    });
  });
};

export const getUserAddressByUserId = (req, res) => {
  const id = req.params.id;
  getByUserAddressUserId(id, (err, results) => {
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
      user_address: results,
    });
  });
};

export const getAllUserAddress = (req, res) => {
  const query = req.query;
  getPaginated(query, tableNames.USERADDRESS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getUserAddress(result, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        user_address: results,
        pagination: {
          totalPage: pagination,
          page: Number(query.page),
          limit: Number(query.limit),
        },
      });
    });
  });
};

export const updateUserAddressById = (req, res) => {
  const params = req.params;
  const body = req.body;
  updateUserAddress(body, params.id, (err, results) => {
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

export const deleteUserAddressById = (req, res) => {
  const data = req.params;
  deleteUserAddress(data, (err, results) => {
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
