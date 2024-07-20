import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO discount_banner (title, sub_title, description, button_name, page_url, status,cat_type, image) VALUES (?,?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.sub_title,
      data.description,
      data.button_name,
      data.page_url,
      data.status,
      data.cat_type,
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

export const getByDiscountId = (id, callBack) => {
  db.query(
    `SELECT id, title, sub_title, description, button_name, page_url, status,cat_type, image from discount_banner WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getDiscount = (callBack) => {
  db.query(
    `SELECT id, title, sub_title, description, button_name, page_url, status,cat_type, image FROM discount_banner`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateDiscount = (data, id, callBack) => {
  db.query(
    `UPDATE discount_banner SET title = ?, sub_title = ?, description = ?, button_name = ?, page_url = ?, status = ?,cat_type=?, image = ? WHERE id = ?`,
    [
      data.title,
      data.sub_title,
      data.description,
      data.button_name,
      data.page_url,
      data.status,
      data.cat_type,
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

export const deleteDiscount = (data, callBack) => {
  db.query(
    `DELETE FROM discount_banner WHERE discount_banner.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
