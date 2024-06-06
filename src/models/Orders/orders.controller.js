import { tableNames } from "../../database/tables/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import {
  create,
  updateOrders,
  deleteOrders,
  getOrders,
  getByOrdersId,
} from "./orders.service.js";

export const createOrders= (req, res) => {
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
  }

export const getOrdersById = (req, res) => {
  const id = req.params.id;
  getByOrdersId(id, (err, results) => {
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
      order: results,
    });
  });
};

export const getOrdersByPaymentStatus = (req, res) => {
  const id = req.params.id;
  getByOrdersId(id, (err, results) => {
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
      order: results,
    });
  });
};

export const getAllOrders = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.BRANDS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getOrders(result, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        orders: results,
        pagination: {
          totalPage: pagination,
          page: Number(query.page),
          limit: Number(query.limit),
        },
      });
    });
  });
};

export const updateOrdersById = (req, res) => {
  const params = req.params;
  const body = req.body;
    updateOrders(body, params.id, (err, results) => {
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

export const deleteOrdersById = (req, res) => {
  const data = req.params;
  deleteOrders(data, (err, results) => {
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
