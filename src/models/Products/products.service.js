import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO products (image, short_name, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data?.image,
      data?.short_name,
      data.name,
      getSlugwithName(data.name),
      data.category,
      data.sub_category,
      data.collection,
      data.brand,
      data.sku,
      data.price,
      data.offer_price,
      data.quantity,
      data.weight,
      data.short_description,
      data.long_description,
      data.status,
      data.seo_title,
      data.seo_description,
      data.top_product,
      data.new_arrival,
      data.best_product,
      data.featured_product,
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
    `SELECT id, image, short_name, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product FROM products WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByProductsSlug = (id, callBack) => {
  db.query(
    `SELECT id, image, short_name, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product FROM products WHERE slug = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByProductsSubcatId = (id, callBack) => {
  db.query(
    `SELECT id, image, short_name, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product FROM products WHERE sub_category_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
export const getProducts = (data, callBack) => {
  db.query(
    `SELECT id, image, short_name, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, best_product FROM products LIMIT ${data.limit} OFFSET ${data.offset}`,
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
    `UPDATE products SET image = ?, short_name = ?, name = ?, slug = ?, category_id = ?, sub_category_id = ?, collection_id = ?, brand_id = ?, sku = ?, price = ?, offer_price = ?, stock_quantity = ?, weight = ?, short_description = ?, long_description = ?, status = ?, seo_title = ?, seo_description = ?, top_product = ?, new_arrival = ?, best_product = ? WHERE id = ?`,
    [
      data?.image,
      data?.short_name,
      data.name,
      getSlugwithName(data.name),
      data.category,
      data.sub_category,
      data.collection,
      data.brand,
      data.sku,
      data.price,
      data.offer_price,
      data.quantity,
      data.weight,
      data.short_description,
      data.long_description,
      data.status,
      data.seo_title,
      data.seo_description,
      data.top_product,
      data.new_arrival,
      data.best_product,
      data.featured_product,
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
