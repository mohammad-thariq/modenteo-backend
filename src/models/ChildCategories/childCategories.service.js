import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO child_categories (category, sub_category, name, slug, status, image) VALUES (?, ?, ?, ?, ?)`,
    [data.category, data.name, data.slug, data.status, data?.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByChildCategoryId = (id, callBack) => {
  db.query(
    `SELECT id, category, sub_category, name, slug, status, image FROM child_categories WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getChildCategoriesByStatus = (callBack) => {
  db.query(
    `SELECT * FROM child_categories WHERE status=${1}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getChildCategories = (callBack) => {
  db.query(
    `SELECT id, category, sub_category, name, slug, status, image FROM child_categories`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateChildCategory = (data, id, callBack) => {
  db.query(
    `UPDATE child_categories SET category = ?, sub_category = ?, name = ?, slug = ?, status = ?, image = ? WHERE id = ?`,
    [data.category, data.name, data.slug, data.status, data.image, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteChildCategory = (data, callBack) => {
  db.query(
    `DELETE FROM child_categories WHERE child_categories.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
