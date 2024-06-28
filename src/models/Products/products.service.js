import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO products (image, short_name, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, featured_product,best_product,gallery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)`,
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
      data.gallery
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
    `SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE id = ?`,
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
    `SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE slug = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results[0] : null);
    }
  );
};

export const getByProductsbyCollection = (id, filters, callBack) => {
  let query = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE ' + id + ' = 1';
  const queryParams = [id];

  if (filters?.brands && filters?.brands?.length > 0) {
    const brandIds = filters?.brands?.map(brand => brand?.value);
    query += ' AND brand_id IN (?)';
    queryParams?.push(brandIds);
  }

  if (filters?.collections && filters?.collections?.length > 0) {
    const collectionIds = filters?.collections?.map(collection => collection?.value);
    query += ' AND collection_id IN (?)';
    queryParams?.push(collectionIds);
  }

  if (filters?.mensWear && filters?.mensWear?.length > 0) {
    const mensWearIds = filters?.mensWear?.map(mensWear => mensWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(mensWearIds);
  }

  if (filters?.womensWear && filters?.womensWear?.length > 0) {
    const womensIds = filters?.womensWear?.map(womensWear => womensWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(womensIds);
  }

  if (filters?.kidsWear && filters?.kidsWear?.length > 0) {
    const kidsWearIds = filters?.kidsWear?.map(kidsWear => kidsWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(kidsWearIds);
  }

  if (filters?.productCatalog && filters?.productCatalog?.length > 0) {
    filters?.productCatalog?.forEach(catalog => {
      if (catalog?.value === 'new arrival') {
        query += ' AND new_arrival = 1';
      } else if (catalog?.value === 'top products') {
        query += ' AND top_product = 1';
      } else if (catalog?.value === 'featured products') {
        query += ' AND featured_product = 1';
      } else if (catalog?.value === 'best products') {
        query += ' AND best_product = 1';
      }
    });
  }
  
  db?.query(query, queryParams, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getByProductsbyCollectionID = (id, filters, callBack) => {
  let query = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE collection_id = ' + id;
  const queryParams = [id];

  if (filters?.brands && filters?.brands?.length > 0) {
    const brandIds = filters?.brands?.map(brand => brand?.value);
    query += ' AND brand_id IN (?)';
    queryParams?.push(brandIds);
  }

  if (filters?.collections && filters?.collections?.length > 0) {
    const collectionIds = filters?.collections?.map(collection => collection?.value);
    query += ' AND collection_id IN (?)';
    queryParams?.push(collectionIds);
  }

  if (filters?.mensWear && filters?.mensWear?.length > 0) {
    const mensWearIds = filters?.mensWear?.map(mensWear => mensWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(mensWearIds);
  }

  if (filters?.womensWear && filters?.womensWear?.length > 0) {
    const womensIds = filters?.womensWear?.map(womensWear => womensWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(womensIds);
  }

  if (filters?.kidsWear && filters?.kidsWear?.length > 0) {
    const kidsWearIds = filters?.kidsWear?.map(kidsWear => kidsWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(kidsWearIds);
  }

  if (filters?.productCatalog && filters?.productCatalog?.length > 0) {
    filters?.productCatalog?.forEach(catalog => {
      if (catalog?.value === 'new arrival') {
        query += ' AND new_arrival = 1';
      } else if (catalog?.value === 'top products') {
        query += ' AND top_product = 1';
      } else if (catalog?.value === 'featured products') {
        query += ' AND featured_product = 1';
      } else if (catalog?.value === 'best products') {
        query += ' AND best_product = 1';
      }
    });
  }
  
  db.query(query, queryParams, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getByProductsbyBrandID = (id, callBack) => {
  let executeQuery = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE brand_id = ' + id;
  db.query(executeQuery,
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getByProductsbyCategoryID = (id, filters, callBack) => {
  let query = 'SELECT id, image, short_name, gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, featured_product, best_product FROM products WHERE category_id = ?';
  const queryParams = [id];

  if (filters?.brands && filters?.brands?.length > 0) {
    const brandIds = filters?.brands.map(brand => brand?.value);
    query += ' AND brand_id IN (?)';
    queryParams?.push(brandIds);
  }

  if (filters?.collections && filters?.collections?.length > 0) {
    const collectionIds = filters?.collections.map(collection => collection?.value);
    query += ' AND collection_id IN (?)';
    queryParams?.push(collectionIds);
  }

  if (filters?.mensWear && filters?.mensWear?.length > 0) {
    const mensWearIds = filters?.mensWear?.map(mensWear => mensWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(mensWearIds);
  }

  if (filters?.womensWear && filters?.womensWear?.length > 0) {
    const womensIds = filters?.womensWear?.map(womensWear => womensWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(womensIds);
  }

  if (filters?.kidsWear && filters?.kidsWear?.length > 0) {
    const kidsWearIds = filters?.kidsWear?.map(kidsWear => kidsWear?.value);
    query += ' AND sub_category_id IN (?)';
    queryParams?.push(kidsWearIds);
  }

  if (filters?.productCatalog && filters?.productCatalog?.length > 0) {
    filters?.productCatalog?.forEach(catalog => {
      if (catalog?.value === 'new arrival') {
        query += ' AND new_arrival = 1';
      } else if (catalog?.value === 'top products') {
        query += ' AND top_product = 1';
      } else if (catalog?.value === 'featured products') {
        query += ' AND featured_product = 1';
      } else if (catalog?.value === 'best products') {
        query += ' AND best_product = 1';
      }
    });
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getByProductsSubcatId = (id, filters,  callBack) => {
  let query = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE sub_category_id = ?';
  const queryParams = [id];

  if (filters?.brands && filters?.brands?.length > 0) {
    const brandIds = filters?.brands?.map(brand => brand?.value);
    query += ' AND brand_id IN (?)';
    queryParams.push(brandIds);
  }

  if (filters?.collections && filters?.collections?.length > 0) {
    const collectionIds = filters?.collections?.map(collection => collection?.value);
    query += ' AND collection_id IN (?)';
    queryParams.push(collectionIds);
  }

  if (filters?.productCatalog && filters?.productCatalog?.length > 0) {
    filters?.productCatalog?.forEach(catalog => {
      if (catalog?.value === 'new arrival') {
        query += ' AND new_arrival = 1';
      } else if (catalog?.value === 'top products') {
        query += ' AND top_product = 1';
      } else if (catalog?.value === 'featured products') {
        query += ' AND featured_product = 1';
      } else if (catalog?.value === 'best products') {
        query += ' AND best_product = 1';
      }
    });
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};


export const getProducts = (data, callBack) => {
  db.query(
    `SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, price, offer_price, stock_quantity, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products LIMIT ${data.limit} OFFSET ${data.offset}`,
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
    `UPDATE products SET image = ?, short_name = ?, name = ?, slug = ?, category_id = ?, sub_category_id = ?, collection_id = ?, brand_id = ?, sku = ?, price = ?, offer_price = ?, stock_quantity = ?, weight = ?, short_description = ?, long_description = ?, status = ?, seo_title = ?, seo_description = ?, top_product = ?, new_arrival = ?,featured_product =?, best_product = ?, gallery= ? WHERE id = ?`,
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
      data.gallery,
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
