import db from "../../database/index.js";

export const createhomesettings = (data, callBack) => {
  const promises = data.map(element => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO home_settings (after_section, type, value, title, description, view_more) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          element.section || element.after_section,
          element.type,
          element.value,
          element.title,
          element.description,
          element.view_more,
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

export const createsettings = (data, callBack) => {
  const promises = data.map(element => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO settings (type, enabled, title, description) VALUES (?, ?, ?, ?)`,
        [
          element.type,
          element.enabled,
          element.title,
          element.description,
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



export const gethomesettings = (callBack) => {
  db.query(
    `SELECT * FROM home_settings`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};


export const getsetttings = (callBack) => {
  db.query(
    `SELECT * FROM settings`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deletehomesettings = (callBack) => {
  db.query(
    `DELETE FROM home_settings`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deletesettings = (callBack) => {
  db.query(
    `DELETE FROM settings`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
