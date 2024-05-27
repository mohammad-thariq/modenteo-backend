import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO brands (name, slug, status, image) VALUES (?, ?, ?, ?)`,
    [data.name, data.slug, data.status, data.image],
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

export const getBrandsByStatus = (callBack) => {
  db.query(`SELECT * FROM brands WHERE status=${1}`, [], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getBrands = (callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM brands`,
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
    [data.name, data.slug, data.status, data.image, id],
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
