import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO orders (order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?)`,
    [
      data.order_id,
      data.user_id,
      data.billing_id,
      data.payment_status,
      data.order_status,
      data.ordered_date,
      data.order_completed_date,
      data.order_cancelled_date,
      data.order_delivered_date,
      data.total_amount,
      data.shipping_method,
      data.shipping_cost,
      data.discount_amount,
      data.mode_of_payment,
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
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE order_id = ?`,
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
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE id = ?`,
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
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE user_id = ?`,
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
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
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
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
    [1],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getDispatchedOrders = (orderStatus, callBack) => {
  db.query(
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
    [orderStatus],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getCompletedOrders = (orderStatus, callBack) => {
  db.query(
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE order_status = ?`,
    [orderStatus],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getDeclinedOrders = (orderStatus, callBack) => {
  db.query(
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders WHERE order_status= ?`,
    [orderStatus],
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
    `SELECT id, order_id, user_id, billing_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date FROM orders LIMIT ${data.limit} OFFSET ${data.offset}`,
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
    `UPDATE orders SET order_id = ?, user_id = ?, billing_id = ?, payment_status = ?, order_status = ?, ordered_date = ?, order_completed_date = ?, order_cancelled_date = ?, order_delivered_date = ?, total_amount = ?, shipping_method = ?, shipping_cost = ?, discount_amount = ?, mode_of_payment = ?, transection_id = ?, payment_approval_date = ? WHERE id = ?`,
    [
      data.order_id,
      data.user_id,
      data.billing_id,
      data.payment_status,
      data.order_status,
      data.ordered_date,
      data.order_completed_date,
      data.order_cancelled_date,
      data.order_delivered_date,
      data.total_amount,
      data.shipping_method,
      data.shipping_cost,
      data.discount_amount,
      data.mode_of_payment,
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

export const generateNextOrderNumber = async (callBack) => {
  const defaultOrderNumber = '#ORD0001';
  db.query(
    `SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1`,
    (error, results) => {
      console.log(results, 'resultsresults')
      if (error) {
        return callBack(defaultOrderNumber);
      }
      if (results.length > 0) {
        console.log("lastOrderNumber")

        const lastOrderNumber = results[0].order_id;
        const numericPart = parseInt(lastOrderNumber.replace('#ORD', ''), 10);
        const nextNumericPart = numericPart + 1;
        const nextOrderNumber = `#ORD${nextNumericPart.toString().padStart(4, '0')}`;
        return callBack(nextOrderNumber);

      } else {
        return callBack(defaultOrderNumber);
      }

    }
  );

};