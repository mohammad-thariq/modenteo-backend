import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO popular_product (title, description,  page_url, status,cat_type, image) VALUES (?,?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description,
      data.page_url,
      data.status,
      data.image,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByPopularProductId = (id, callBack) => {
  db.query(
    `SELECT id, title, sub_title, description,  page_url, status,cat_type, image from popular_product WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getPopularProduct = (callBack) => {
  db.query(
    `SELECT id, title, description,  page_url, status,cat_type, image FROM popular_product`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updatePopularProduct = (data, id, callBack) => {
  db.query(
    `UPDATE popular_product SET title = ?, description = ?,  page_url = ?,cat_type=?, status = ?, image = ? WHERE id = ?`,
    [
      data.title,
      data.description,
      data.page_url,
      data.cat_type,
      data.status,
      data.image,
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

export const deletePopularProduct = (data, callBack) => {
  db.query(
    `DELETE FROM popular_product WHERE popular_product.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
