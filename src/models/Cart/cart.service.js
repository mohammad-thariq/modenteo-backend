import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO cart (product_id, quantity,color,size,brand_id, user_id) VALUES (?,?,?, ?,?, ?)`,
    [data.product_id, data.quantity, data.color, data.size,data.brand_id, data.user_id],
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
    `SELECT cart.user_id, cart.id, cart.quantity,cart.color, cart.size,cart.brand_id, cart.product_id,products.price,products.offer_price, products.name,products.image, products.slug FROM cart INNER JOIN products on products.id = cart.product_id WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
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

export const deleteCart = (id, callBack) => {
  db.query(
    `DELETE FROM cart WHERE cart.id=?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
