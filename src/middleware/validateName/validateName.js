import db from "../../database/index.js";

export const getValidateByName = (name, table, callBack) => {
  db.query(
    `SELECT * FROM ${table} WHERE name=?`,
    [name],
    async (err, result) => {
      if (err) {
        return await callBack(err);
      }
      return await callBack(null, result);
    }
  );
};
