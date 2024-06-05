import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO sub_categories (category_id, name, slug, status, image) VALUES (?, ?, ?, ?, ?)`,
    [
      data.category_id,
      data.name,
      getSlugwithName(data.name),
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

export const getBySubCategorySlug = (cat, subcat, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM sub_categories WHERE slug = ? and category_id = ?`,
    [subcat, cat],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getBySubCategoryId = (id, callBack) => {
  db.query(
    `SELECT id, category_id, name, slug, status, image FROM sub_categories WHERE id = ?`,
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

export const getSubCategories = (data, callBack) => {
  db.query(
    `SELECT id, category_id, name, slug, status, image FROM sub_categories LIMIT ${data.limit} OFFSET ${data.offset}`,
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
  db.query(
    `UPDATE sub_categories SET category_id = ?, name = ?, slug = ?, status = ?, image = ? WHERE id = ?`,
    [
      data.category_id,
      data.name,
      getSlugwithName(data.name),
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

export const getSubCategoryByCatgoryId = (id, callBack) => {
  db.query(
    `SELECT id, category_id, name, slug, status, image   FROM sub_categories WHERE category_id = ? and status=1`,
    [id],
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
