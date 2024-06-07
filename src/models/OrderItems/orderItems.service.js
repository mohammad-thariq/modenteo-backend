import db from "../../database/index.js";

export const create = (data, callBack) => {
  console.log(data,'datadata')
  db.query(
    `INSERT INTO orders_items (order_id, product_id, quantity, product_price, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.order_id,
      data.product_id,
      data.quantity,
      data.price,
      data.created_at,
      data.updated_at,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByOrderItemsOrderId = (id, callBack) => {
  db.query(
    `SELECT id, order_id, product_id, quantity, product_price, created_at, updated_at FROM orders_items WHERE order_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByOrderItemsId = (id, callBack) => {
  db.query(
    `SELECT id, order_id, product_id, quantity, product_price, created_at, updated_at FROM orders_items WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByOrderItemsUserId = (id, callBack) => {
  db.query(
    `SELECT id, order_id, product_id, quantity, product_price, created_at, updated_at FROM orders_items WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getOrderItems = (data, callBack) => {
  db.query(
    `SELECT id, order_id, product_id, quantity, product_price, created_at, updated_at FROM orders_items LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateOrderItems = (data, id, callBack) => {
  db.query(
    `UPDATE orders_items SET order_id = ?, product_id = ?, quantity = ?, product_price = ?, updated_at = ?  WHERE id = ?`,
    [
      data.order_id,
      data.product_id,
      data.quantity,
      data.product_price,
      data.updated_at,
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

export const deleteOrderItems = (data, callBack) => {
  db.query(
    `DELETE FROM orders_items WHERE orders_items.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
