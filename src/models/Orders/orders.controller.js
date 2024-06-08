import { tableNames } from "../../database/tables/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import {
  create,
  updateOrders,
  deleteOrders,
  getOrders,
  getByOrdersId,
  getByUserId,
  generateNextOrderNumber,
  getPendingOrders,
  getInProcessOrders,
  getDispatchedOrders,
  getDeclinedOrders,
  getDeliveredOrders,
} from "./orders.service.js";
import { create as createOrderItem } from "../OrderItems/orderItems.service.js";

export const createOrders = async (req, res) => {
  const body = req.body;
  let products = body.products;
  let orderNumber = "";
  // Generate Order No
  generateNextOrderNumber((results) => {
    orderNumber = results;
    // Create Order
    body.order_id = orderNumber;
    const currentDatetime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    body.ordered_date = currentDatetime;

    create(body, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      try {
        await Promise.all(
          products.map(async (item) => {
            item.order_id = orderNumber;
            item.created_at = currentDatetime;
            item.updated_at = currentDatetime;
            createOrderItem(item, (err, results) => {});
          })
        );
      } catch (error) {
        return res.status(200).json({
          success: 1,
          data: error,
        });
      } finally {
        return res.status(200).json({
          success: 1,
          data: "Order Created Successfully",
          orderNumber: orderNumber,
        });
      }
    });
  });
};

export const getOrdersByUserID = (req, res) => {
  const id = req.params.id;
  const query = req.query;

  getByUserId(query, id, (err, results) => {
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

export const getAllPendingOrders = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.ORDERS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getPendingOrders(result, async (err, results) => {
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

export const getAllProcessOrders = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.ORDERS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getInProcessOrders(result, async (err, results) => {
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

export const getAllDispatchedOrders = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.ORDERS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getDispatchedOrders(result, async (err, results) => {
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

export const getAllDeclinedOrders = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.ORDERS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getDeclinedOrders(result, async (err, results) => {
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

export const getAllDeliveredOrders = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.ORDERS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getDeliveredOrders(result, async (err, results) => {
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

export const getAllOrders = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.ORDERS, (err, result, pagination) => {
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
};

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
