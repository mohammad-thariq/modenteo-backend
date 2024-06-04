import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO customer_service (badge, description, icon, page_url, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.badge, data.description, data.icon, data.page_url, data.status],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByCustomerServiceId = (id, callBack) => {
  db.query(
    `SELECT id, badge, description, icon, page_url, status from customer_service WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getCustomerService = (callBack) => {
  db.query(
    `SELECT id, badge, description, icon, page_url, status FROM customer_service`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateCustomerService = (data, id, callBack) => {
  db.query(
    `UPDATE customer_service SET badge = ?, description = ?, icon = ?, page_url = ?, status = ? WHERE id = ?`,
    [data.badge, data.description, data.icon, data.page_url, data.status, id],

    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteCustomerService = (data, callBack) => {
  db.query(
    `DELETE FROM customer_service WHERE customer_service.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
