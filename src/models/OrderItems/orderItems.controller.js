import { tableNames } from "../../database/tables/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import {
  create,
  deleteOrderItems,
  getByOrderItemsId,
  getOrderItems,
  updateOrderItems,
} from "./orderItems.service.js";

export const createOrderItems = (req, res) => {
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

export const getOrderItemsById = (req, res) => {
  const id = req.params.id;
  getByOrderItemsId(id, (err, results) => {
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

// export const getOrderItemsByPaymentStatus = (req, res) => {
//   const id = req.params.id;
//   getByOrderItemsId(id, (err, results) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({
//         success: 0,
//         message: "Database connection error",
//       });
//     }
//     if (!results) {
//       return res.status(404).json({
//         success: 0,
//         message: "Record not found",
//       });
//     }
//     return res.status(200).json({
//       success: 1,
//       order: results,
//     });
//   });
// };

export const getAllOrderItems = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.ORDERITEMS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getOrderItems(result, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        OrderItems: results,
        pagination: {
          totalPage: pagination,
          page: Number(query.page),
          limit: Number(query.limit),
        },
      });
    });
  });
};

export const updateOrderItemsById = (req, res) => {
  const params = req.params;
  const body = req.body;
  updateOrderItems(body, params.id, (err, results) => {
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

export const deleteOrderItemsById = (req, res) => {
  const data = req.params;
  deleteOrderItems(data, (err, results) => {
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
