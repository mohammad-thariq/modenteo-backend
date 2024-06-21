import db from "../../database/index.js";

export const getPaginated = async (data, table, callBack) => {
  if (typeof data.limit === "undefined" || typeof data.page === "undefined") {
    callBack({
      error: "Missing required parameters: limit and/or page.",
    });
    return;
  }

  const limit = data.limit;
  const offset = (data.page - 1) * data.limit;
  db.query(`SELECT COUNT(*) AS count FROM ${table}`, [], (error, results) => {
    const totalPages = Math.ceil(results?.[0].count / limit);

    if (error) {
      return callBack(error);
    }
    return callBack(
      null,
      {
        limit: limit,
        offset: offset,
      },
      totalPages
    );
  });
};
