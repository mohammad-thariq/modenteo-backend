import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO pages (title, content, status, slug) VALUES (?, ?, ?, ?)`,
    [data.title, data.content, data.status, getSlugwithName(data.title)],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByPagesId = (id, callBack) => {
  db.query(
    `SELECT id, title, content, status, slug FROM pages WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByPagesSlug = (id, callBack) => {
  db.query(
    `SELECT id, title, content, status, slug FROM pages WHERE content = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getPages = (data, callBack) => {
  db.query(
    `SELECT id, title, content, status, slug FROM pages LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updatePage = (data, id, callBack) => {
  db.query(
    `UPDATE pages SET title = ?, content = ?, status = ?, slug = ? WHERE id = ?`,
    [data.title, data.content,data.status, getSlugwithName(data.title), , id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deletePage = (data, callBack) => {
  db.query(
    `DELETE FROM pages WHERE pages.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
