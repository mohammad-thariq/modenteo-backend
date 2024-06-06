import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO orders (order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.order_id,
      data.product_qty,
      data.user_id,
      data.order_status,
      data.payment_status,
      data.order_completed_date,
      data.order_declined_date,
      data.order_delivered_date,
      data.total_amount,
      data.shipping_method,
      data.shipping_cost,
      data.transection_id,
      data.payment_approval_date,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByOrdersOrderId = (id, callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE order_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByOrdersId = (id, callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByOrdersUserId = (id, callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getPendingOrders = (callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
    [0],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getInProcessOrders = (callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
    [1],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getDispatchedOrders = (callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
    [2],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getCompletedOrders = (callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
    [3],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};


export const getDeclinedOrders = (callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders WHERE order_status= ?`,
    [4],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getOrders = (data, callBack) => {
  db.query(
    `SELECT id, order_id, product_qty, user_id, order_status, payment_status, order_completed_date, order_declined_date, order_delivered_date, total_amount, shipping_method, shipping_cost, transection_id, payment_approval_date FROM orders LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateOrders = (data, id, callBack) => {
  db.query(
    `UPDATE orders SET order_id = ?, product_qty = ?, user_id = ?, order_status = ?, payment_status = ?, order_completed_date = ?, order_declined_date = ?, order_delivered_date = ?, total_amount = ?, shipping_method = ?, shipping_cost = ?, transection_id = ?, payment_approval_date = ? WHERE id = ?`,
    [data.name, getSlugwithName(data.name), data.status, data.image, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteOrders = (data, callBack) => {
  db.query(
    `DELETE FROM orders WHERE orders.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
