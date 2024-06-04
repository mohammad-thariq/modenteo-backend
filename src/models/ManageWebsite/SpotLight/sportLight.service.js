import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO spot_light (title, description, button_name, page_url, status, image) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.title, data.description, data.button_name, data.page_url, data.status, data.image],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getBySpotLightId = (id, callBack) => {
  db.query(
    `SELECT id, title, description, button_name, page_url, status, image from spot_light WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getSpotLight = (callBack) => {
  db.query(
    `SELECT id, title, description, button_name, page_url, status, image FROM spot_light`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateSpotLight = (data, id, callBack) => {
  db.query(
    `UPDATE spot_light SET title = ?, description = ?, button_name = ?, page_url = ?, status = ?, image = ? WHERE id = ?`,
    [data.title, data.description, data.button_name, data.page_url, data.status, data.image, id],

    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteSpotLight = (data, callBack) => {
  db.query(
    `DELETE FROM spot_light WHERE spot_light.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
