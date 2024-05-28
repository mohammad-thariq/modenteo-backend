import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO products (image, short_name, name, slug, category, sub_category, child_category, brand, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product) VALUES (?, ?, ?, ?, ?)`,
    [
      data.category,
      data.name,
      getSlugwithName(data.name),
      data.status,
      data?.image,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByProductsId = (id, callBack) => {
  db.query(
    `SELECT id, image, short_name, name, slug, category, sub_category, child_category, brand, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product FROM products WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getProductByStatus = (callBack) => {
  db.query(`SELECT * FROM products WHERE status=${1}`, [], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getProducts = (callBack) => {
  db.query(
    `SELECT id, image, short_name, name, slug, category, sub_category, child_category, brand, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product FROM products`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const updateProducts = (data, id, callBack) => {
  db.query(
    `UPDATE products SET image = ?, short_name = ?, name = ?, slug = ?, category = ?, sub_category = ?, child_category = ?, brand = ?, sku = ?, price = ?, offer_price = ?, stock_quantity = ?, weight = ?, short_description = ?, long_description = ?, status = ?, seo_title = ?, seo_description = ?, top_product = ?, new_arrival = ?, best_product = ? WHERE id = ?`,
    [
      data.category,
      data.name,
      getSlugwithName(data.name),
      data.status,
      data.image,
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

export const deleteProducts = (data, callBack) => {
  db.query(
    `DELETE FROM products WHERE products.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
