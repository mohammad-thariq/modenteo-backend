import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO categories (name, slug, status, image) VALUES (?, ?, ?, ?)`,
    [data.name, data.slug, data.status, data.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByCategoryId = (id, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM categories WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getCategories = (data, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM categories LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getCategoriesByStatus = (callBack) => {
  db.query(
    `SELECT * FROM categories WHERE status=${1}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateCategory = (data, id, callBack) => {
  db.query(
    `UPDATE categories SET name = ?, slug = ?, status = ?, image = ? WHERE id = ?`,
    [data.name, data.slug, data.status, data.image, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteCategory = (data, callBack) => {
  db.query(
    `DELETE FROM categories WHERE categories.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
