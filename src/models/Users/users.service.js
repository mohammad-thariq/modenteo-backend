import db from "../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO users (first_name, last_name, email, password, type) VALUES (?, ?, ?, ?, ?)`,
    [data.first_name, data.last_name, data.email, data.password, data.type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getUserByUserEmail = (email, callBack) => {
  db.query(`SELECT * FROM users WHERE email=?`, [email], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results.length ? results[0] : null);
  });
};

export const getUserByUserType = (type, callBack) => {
  db.query(`SELECT * FROM users WHERE type = ?`, [type], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getUserByUserEmailAndType = (email, type, callBack) => {
  db.query(
    `SELECT * FROM users WHERE email=? AND type=?`,
    [email, type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getUserByUserId = (id, callBack) => {
  db.query(
    `SELECT id, first_name, last_name, email, type FROM users WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getUsers = async (data, callBack) => {
  db.query(
    `SELECT id, first_name, last_name, email, type FROM users LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateUser = (data, id, callBack) => {
  db.query(
    `UPDATE users SET first_name = ?, last_name = ?,  password = ?, type = ? WHERE id = ?`,
    [data.first_name, data.last_name, data.password, data.type, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteUser = (data, callBack) => {
  db.query(
    `DELETE FROM users WHERE users.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
