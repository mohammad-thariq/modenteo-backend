import db from "../../database/index.js";

export const createhomesettings = (data, type, callBack) => {
  const promises = data.map(element => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO home_settings (after_section, type, value, title, description, view_more, cat_type) VALUES (?, ?, ?, ?, ?, ?,?)`,
        [
          element.section || element.after_section,
          element.type,
          element.value,
          element.title,
          element.description,
          element.view_more,
          type
        ],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  });

  Promise.all(promises)
    .then(results => callBack(null, results))
    .catch(error => callBack(error));
};

export const createsettings = (data,type, callBack) => {
  const promises = data.map(element => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO settings (type, enabled, title, description,cat_type) VALUES (?, ?, ?, ?,?)`,
        [
          element.type,
          element.enabled,
          element.title,
          element.description,
          type
        ],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  });

  Promise.all(promises)
    .then(results => callBack(null, results))
    .catch(error => callBack(error));
};

export const gethomesettings = (type,callBack) => {
  db.query(
    `SELECT * FROM home_settings WHERE cat_type = ?`,
    [type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};


export const getsetttings = (type,callBack) => {
  db.query(
    `SELECT * FROM settings WHERE cat_type = ?`,
    [type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deletehomesettings = (type,callBack) => {
  db.query(
    `DELETE FROM home_settings WHERE cat_type = ?`,
    [type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deletesettings = (type,callBack) => {
  db.query(
    `DELETE FROM settings WHERE cat_type = ?`,
    [type],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
