import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO sub_categories (category, name, slug, status, image) VALUES (?, ?, ?, ?, ?)`,
    [data.category, data.name, data.slug, data.status, data.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getBySubCategoryId = (id, callBack) => {
  db.query(
    `SELECT id, category, name, slug, status, image FROM sub_categories WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getSubCategoriesByStatus = (callBack) => {
  db.query(
    `SELECT * FROM sub_categories WHERE status=${1}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getSubCategories = (callBack) => {
  db.query(
    `SELECT id, category, name, slug, status, image FROM sub_categories`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateSubCategory = (data, id, callBack) => {
  console.log(data, "data");
  db.query(
    `UPDATE sub_categories SET category = ?, name = ?, slug = ?, status = ?, image = ? WHERE id = ?`,
    [data.category, data.name, data.slug, data.status, data.image, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteSubCategory = (data, callBack) => {
  db.query(
    `DELETE FROM sub_categories WHERE sub_categories.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
