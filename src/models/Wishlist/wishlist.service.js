import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO wishlist (product_id, user_id) VALUES (?, ?)`,
    [data.product_id, data.user_id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const get = (id, callBack) => {
  db.query(`SELECT wishlist.user_id, wishlist.id, wishlist.product_id,products.price,products.stock_quantity,products.offer_price, products.name,products.image FROM wishlist INNER JOIN products on products.id = wishlist.product_id WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteWishlist = (id, callBack) => {
  db.query(
    `DELETE FROM wishlist WHERE id=?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
