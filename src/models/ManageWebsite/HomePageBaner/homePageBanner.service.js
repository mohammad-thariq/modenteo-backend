import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO banner (title, sub_title, description, button_name, page_url, status,cat_type, image) VALUES (?,?, ?, ?, ?, ?, ?, ?)`,
    [data.title, data.sub_title, data.description, data.button_name, data.page_url, data.status, data.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByBannerId = (id, callBack) => {
  db.query(
    `SELECT id, title, sub_title, description, button_name, page_url, status,cat_type, image from banner WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getBanner = (callBack) => {
  db.query(
    `SELECT id, title, sub_title, description, button_name, page_url, status,cat_type, image FROM banner`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateBanner = (data, id, callBack) => {
  db.query(
    `UPDATE banner SET title = ?, sub_title = ?, description = ?, button_name = ?, page_url = ?, cat_type =?, status = ?, image = ? WHERE id = ?`,
    [data.title, data.sub_title, data.description, data.button_name, data.page_url, data.cat_type, data.status, data.image, id],

    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteBanner = (data, callBack) => {
  db.query(
    `DELETE FROM banner WHERE banner.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
