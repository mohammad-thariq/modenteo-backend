import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO child_categories (category_id, sub_category_id, name, slug, status, image) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.category_id,
      data.sub_category_id,
      data.name,
      getSlugwithName(data.name),
      data.status,
      data?.image,
    ],
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
    `SELECT id, category_id, sub_category_id, name, slug, status, image FROM child_categories WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getChildCategories = (data, callBack) => {
  db.query(
    `SELECT id, category_id, sub_category_id, name, slug, status, image FROM child_categories LIMIT ${data.limit} OFFSET ${data.offset}`,
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
    `UPDATE child_categories SET category_id = ?, sub_category_id = ?, name = ?, slug = ?, status = ?, image = ? WHERE id = ?`,
    [
      data.category_id,
      data.sub_category_id,
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
