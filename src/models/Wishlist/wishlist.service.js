import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO wishlist (product_id, user_id) VALUES (?, ?, ?)`,
    [data.product_id, data.user_id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};


export const deleteWishlist = (data, callBack) => {
  db.query(
    `DELETE FROM wishlist WHERE wishlist.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
