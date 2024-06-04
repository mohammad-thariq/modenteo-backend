import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO popular_product (title, description, button_name, page_url, status, image) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description,
      data.button_name,
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
    `SELECT id, title, sub_title, description, button_name, page_url, status, image from popular_product WHERE id = ?`,
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
    `SELECT id, title, description, button_name, page_url, status, image FROM popular_product`,
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
    `UPDATE popular_product SET title = ?, description = ?, button_name = ?, page_url = ?, status = ?, image = ? WHERE id = ?`,
    [
      data.title,
      data.description,
      data.button_name,
      data.page_url,
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
