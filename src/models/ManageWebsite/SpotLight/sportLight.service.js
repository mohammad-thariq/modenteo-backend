import db from "../../../database/index.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO spot_light (badge, page_url, status, image, bg_color) VALUES (?, ?, ?, ?, ?)`,
    [data.badge, data.page_url, data.status, data.image, data.bg_color],
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
    `SELECT id, badge, page_url, status, image, bg_color from spot_light WHERE id = ?`,
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
    `SELECT id, badge, page_url, status, image, bg_color FROM spot_light`,
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
    `UPDATE spot_light SET badge = ?, page_url = ?, status = ?, image = ?, bg_color = ? WHERE id = ?`,
    [data.badge, data.page_url, data.status, data.image, data.bg_color, id],

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
