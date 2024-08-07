import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO fashion_products (page_url, status, image,cat_type) VALUES (?, ?, ?,?)`,
    [data.page_url, data.status, data.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByFashionId = (id, callBack) => {
  db.query(
    `SELECT id, page_url, status, image,cat_type from fashion_products WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getFashion = (callBack) => {
  db.query(
    `SELECT id, page_url, status,cat_type, image FROM fashion_products`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateFashion = (data, id, callBack) => {
  db.query(
    `UPDATE fashion_products SET page_url = ?, status = ?, image = ?, cat_type= ? WHERE id = ?`,
    [data.page_url, data.status, data.image,data.cat_type, id],

    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteFashion = (data, callBack) => {
  db.query(
    `DELETE FROM fashion_products WHERE fashion_products.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
