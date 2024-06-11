import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO users (first_name, last_name, email, password, type) VALUES (?, ?, ?, ?, ?)`,
    [data.first_name, data.last_name, data.email, data.password, data.type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getUserByUserEmail = (email, callBack) => {
  db.query(`SELECT * FROM users WHERE email=?`, [email], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results.length ? results[0] : null);
  });
};

export const getUserByUserType = (data, type, callBack) => {
  db.query(
    `SELECT * FROM users WHERE type=? LIMIT ${data.limit} OFFSET ${data.offset}`,
    [type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
export const getUserTodayOrders = (id, callBack) => {
  db.query(
    `SELECT o.id, o.order_id, o.user_id, o.billing_id, o.shipping_id, o.payment_status, o.order_status, o.ordered_date, o.order_completed_date, o.order_cancelled_date, o.order_delivered_date, o.total_amount, o.shipping_method, o.shipping_cost, o.discount_amount, o.mode_of_payment, o.transection_id, o.payment_approval_date FROM orders o WHERE DATE(o.ordered_date) = CURDATE() AND o.user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
export const getOrderCount = (id, callBack) => {
  db.query(
    `SELECT COUNT(*) as order_count FROM orders WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getCartCount = (id, callBack) => {
  db.query(
    `SELECT COUNT(*) as cart_count FROM cart WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getWishlistCount = (id, callBack) => {
  db.query(
    `SELECT COUNT(*) as wishlist_count FROM wishlist WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
export const getUserByUserEmailAndType = (email, type, callBack) => {
  db.query(
    `SELECT * FROM users WHERE email=? AND type=?`,
    [email, type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getUserByUserId = (id, callBack) => {
  db.query(
    `SELECT id, first_name, last_name, email, type FROM users WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getUserDashboard = (id, callBack) => {};
export const getUsers = async (data, callBack) => {
  db.query(
    `SELECT id, first_name, last_name, email, type FROM users LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateUser = (data, id, callBack) => {
  db.query(
    `UPDATE users SET first_name = ?, last_name = ?,  password = ?, type = ? WHERE id = ?`,
    [data.first_name, data.last_name, data.password, data.type, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteUser = (data, callBack) => {
  db.query(
    `DELETE FROM users WHERE users.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
