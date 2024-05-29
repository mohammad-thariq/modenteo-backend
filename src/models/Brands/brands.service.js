import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO brands (name, slug, status, image) VALUES (?, ?, ?, ?)`,
    [data.name, getSlugwithName(data.name), data.status, data.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByBrandsId = (id, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM brands WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getBrands = (data, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM brands LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateBrand = (data, id, callBack) => {
  db.query(
    `UPDATE brands SET name = ?, slug = ?, status = ?, image = ? WHERE id = ?`,
    [data.name, getSlugwithName(data.name), data.status, data.image, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteBrand = (data, callBack) => {
  db.query(
    `DELETE FROM brands WHERE brands.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
