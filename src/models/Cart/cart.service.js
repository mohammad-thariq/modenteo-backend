import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO cart (product_id, quantity, user_id) VALUES (?, ?, ?)`,
    [data.product_id, data.quantity, data.user_id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
export const get = (id, callBack) => {
  db.query(
    `SELECT id, product_id, user_id, quantity FROM cart WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};
export const updateCart = (data, id, callBack) => {
  db.query(
    `UPDATE cart SET quantity = ? WHERE id = ?`,
    [data.quantity, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteCart = (data, callBack) => {
  db.query(
    `DELETE FROM cart WHERE cart.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
