import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO user_address (user_id, fullName, streetAddress, state, city, zipCode, country, phoneNumber, type, is_enable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.fullName,
      data.streetAddress,
      data.state,
      data.city,
      data.zipCode,
      data.country,
      data.phoneNumber,
      data.type,
      data.is_enable,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByUserAddressUserId = (userId, callBack) => {
  db.query(
    `SELECT id, user_id, fullName, streetAddress, state, city, zipCode, country, phoneNumber, type, is_enable FROM user_address WHERE user_id = ?`,
    [userId],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByUserAddressId = (id, callBack) => {
  db.query(
    `SELECT id, user_id, fullName, streetAddress, state, city, zipCode, country, phoneNumber, type, is_enable FROM user_address WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};
export const getUserAddress = (data, callBack) => {
  db.query(
    `SELECT id, user_id, fullName, streetAddress, state, city, zipCode, country, phoneNumber, type, is_enable FROM user_address LIMIT ${data.limit} OFFSET ${data.offset}`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateUserAddress = (data, id, callBack) => {
  db.query(
    `UPDATE user_address SET user_id = ?, fullName = ?, streetAddress = ?, state = ?, city = ?, zipCode = ?, country = ?, phoneNumber = ?, type = ?, is_enable = ? WHERE id = ?`,
    [
      data.user_id,
      data.fullName,
      data.streetAddress,
      data.state,
      data.city,
      data.zipCode,
      data.country,
      data.phoneNumber,
      data.type,
      data.is_enable,
      id,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const deleteUserAddress = (data, callBack) => {
  db.query(
    `DELETE FROM user_address WHERE user_address.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
