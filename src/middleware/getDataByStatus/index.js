import db from "../../database/index.js";

export const getDataByStatus = (table, callBack) => {
  db.query(`SELECT * FROM ${table} WHERE status=${1}`, [], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};


export const getDataByCategoryType = (table, cattype, callBack) => {
  db.query(`SELECT * FROM ${table} WHERE status=${1} AND cat_type='${cattype}'`, [], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
