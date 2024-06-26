import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO orders (order_id, user_id, billing_id,shipping_id, payment_status, order_status, ordered_date, order_completed_date, order_cancelled_date, order_delivered_date, total_amount, shipping_method, shipping_cost, discount_amount, mode_of_payment, transection_id, payment_approval_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?)`,
    [
      data.order_id,
      data.user_id,
      data.billing_id,
      data.shipping_id,
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
      // Clear Cart
      db.query(
        `DELETE FROM cart WHERE user_id=?`,
        [data.user_id],
        (error1, results1) => {
          if (error1) {
            return callBack(error1);
          }
          return callBack(null, results);
        }
      );
    }
  );
};

export const getByOrdersOrderId = (id, callBack) => {
  db.query(
    `SELECT * FROM orders WHERE order_id = ?`,
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
    `SELECT * FROM orders WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getOrderItemDetails = (id, callBack) => {
  db.query(
    `SELECT * FROM orders_items  INNER JOIN products on products.id = orders_items.product_id WHERE order_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results : null);
    }
  );
};


export const getByUserId = (data, id, callBack) => {
  const query = `SELECT * FROM orders WHERE user_id = ? LIMIT ${data.limit} OFFSET ${data.offset}`;

  db.query(query, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getByOrdersUserId = (id, callBack) => {
  db.query(`SELECT * FROM orders WHERE user_id = ?`, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results.length ? results[0] : null);
  });
};

export const getPendingOrders = (data, callBack) => {
  db.query(
    `SELECT orders.id, orders.order_id, orders.user_id, orders.billing_id,shipping_id, orders.payment_status, orders.order_status, orders.ordered_date, orders.order_completed_date, orders.order_cancelled_date, orders.order_delivered_date, orders.total_amount, orders.shipping_method, orders.shipping_cost, orders.discount_amount, orders.mode_of_payment, orders.transection_id, orders.payment_approval_date, users.id as userID, users.first_name  FROM orders INNER JOIN users on users.id = orders.user_id WHERE order_status = ? LIMIT ${data.limit} OFFSET ${data.offset}`,
    [0],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getInProcessOrders = (data, callBack) => {
  db.query(
    `SELECT orders.id, orders.order_id, orders.user_id, orders.billing_id,shipping_id, orders.payment_status, orders.order_status, orders.ordered_date, orders.order_completed_date, orders.order_cancelled_date, orders.order_delivered_date, orders.total_amount, orders.shipping_method, orders.shipping_cost, orders.discount_amount, orders.mode_of_payment, orders.transection_id, orders.payment_approval_date, users.id as userID, users.first_name  FROM orders INNER JOIN users on users.id = orders.user_id WHERE order_status = ? LIMIT ${data.limit} OFFSET ${data.offset}`,
    [1],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getDispatchedOrders = (data, callBack) => {
  db.query(
    `SELECT orders.id, orders.order_id, orders.user_id, orders.billing_id,shipping_id, orders.payment_status, orders.order_status, orders.ordered_date, orders.order_completed_date, orders.order_cancelled_date, orders.order_delivered_date, orders.total_amount, orders.shipping_method, orders.shipping_cost, orders.discount_amount, orders.mode_of_payment, orders.transection_id, orders.payment_approval_date, users.id as userID, users.first_name  FROM orders INNER JOIN users on users.id = orders.user_id WHERE order_status = ? LIMIT ${data.limit} OFFSET ${data.offset}`,
    [2],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getDeliveredOrders = (data, callBack) => {
  db.query(
    `SELECT orders.id, orders.order_id, orders.user_id, orders.billing_id,shipping_id, orders.payment_status, orders.order_status, orders.ordered_date, orders.order_completed_date, orders.order_cancelled_date, orders.order_delivered_date, orders.total_amount, orders.shipping_method, orders.shipping_cost, orders.discount_amount, orders.mode_of_payment, orders.transection_id, orders.payment_approval_date, users.id as userID, users.first_name  FROM orders INNER JOIN users on users.id = orders.user_id WHERE order_status = ? LIMIT ${data.limit} OFFSET ${data.offset}`,
    [3],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getDeclinedOrders = (data, callBack) => {
  db.query(
    `SELECT orders.id, orders.order_id, orders.user_id, orders.billing_id,shipping_id, orders.payment_status, orders.order_status, orders.ordered_date, orders.order_completed_date, orders.order_cancelled_date, orders.order_delivered_date, orders.total_amount, orders.shipping_method, orders.shipping_cost, orders.discount_amount, orders.mode_of_payment, orders.transection_id, orders.payment_approval_date, users.id as userID, users.first_name  FROM orders INNER JOIN users on users.id = orders.user_id WHERE order_status= ? LIMIT ${data.limit} OFFSET ${data.offset}`,
    [4],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getOrders = (data, callBack) => {
  db.query(
    `SELECT orders.id, orders.order_id, orders.user_id, orders.billing_id,shipping_id, orders.payment_status, orders.order_status, orders.ordered_date, orders.order_completed_date, orders.order_cancelled_date, orders.order_delivered_date, orders.total_amount, orders.shipping_method, orders.shipping_cost, orders.discount_amount, orders.mode_of_payment, orders.transection_id, orders.payment_approval_date, users.id as userID, users.first_name  FROM orders INNER JOIN users on users.id = orders.user_id LIMIT ${data.limit} OFFSET ${data.offset}`,
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
    `UPDATE orders SET  payment_status = ?, order_status = ?, order_completed_date = ?, order_cancelled_date = ?, order_delivered_date = ?, payment_approval_date = ? WHERE id = ?`,
    [
      data.payment_status,
      data.order_status,
      data.order_completed_date,
      data.order_cancelled_date,
      data.order_delivered_date,
      data.payment_approval_date,
      id,
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
  const defaultOrderNumber = "#ORD0001";
  db.query(
    `SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1`,
    (error, results) => {
      if (error) {
        return callBack(defaultOrderNumber);
      }
      if (results.length > 0) {
        const lastOrderNumber = results[0].order_id;
        const numericPart = parseInt(lastOrderNumber.replace("#ORD", ""), 10);
        const nextNumericPart = numericPart + 1;
        const nextOrderNumber = `#ORD${nextNumericPart
          .toString()
          .padStart(4, "0")}`;
        return callBack(nextOrderNumber);
      } else {
        return callBack(defaultOrderNumber);
      }
    }
  );
};
