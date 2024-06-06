import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO collections (name, slug, status, image) VALUES (?, ?, ?, ?)`,
    [data.name, getSlugwithName(data.name), data.status, data.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByCollectionsId = (id, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM collections WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByCollectionsSlug = (id, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM collections WHERE slug = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getCollections = (data, callBack) => {
  db.query(
    `SELECT id, name, slug, status, image FROM collections LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateCollection = (data, id, callBack) => {
  db.query(
    `UPDATE collections SET name = ?, slug = ?, status = ?, image = ? WHERE id = ?`,
    [data.name, getSlugwithName(data.name), data.status, data.image, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteCollection = (data, callBack) => {
  db.query(
    `DELETE FROM collections WHERE collections.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
