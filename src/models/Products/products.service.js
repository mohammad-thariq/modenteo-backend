import db from "../../database/index.js";
import { getSlugwithName } from "../../utils/getSlugforAll.js";

export const create = (data, callBack) => {
  db.query(
    `INSERT INTO products (image, short_name, name, slug, category_id, sub_category_id, collection_id, brand_id, sku,color, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, featured_product,best_product,gallery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?,?,?)`,
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
      data.color,
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
    `SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku,color,short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE id = ?`,
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
    `SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku,color,short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE slug = ?`,
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
  let query = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku,color, weight, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE ' + id + ' = 1';
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

  if (filters?.price && filters?.price?.length > 0) {
    filters?.price.forEach(priceRange => {
      const minPrice = priceRange?.value?.min;
      const maxPrice = priceRange?.value?.max;
      query += ' AND ((offer_price IS NOT NULL AND offer_price BETWEEN ? AND ?) OR (offer_price IS NULL AND price BETWEEN ? AND ?))';
      queryParams.push(minPrice, maxPrice, minPrice, maxPrice);
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
  let query = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, color, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE collection_id = ' + id;
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

  if (filters?.price && filters?.price?.length > 0) {
    filters?.price.forEach(priceRange => {
      const minPrice = priceRange?.value?.min;
      const maxPrice = priceRange?.value?.max;
      query += ' AND ((offer_price IS NOT NULL AND offer_price BETWEEN ? AND ?) OR (offer_price IS NULL AND price BETWEEN ? AND ?))';
      queryParams.push(minPrice, maxPrice, minPrice, maxPrice);
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
  let executeQuery = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku, color, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE brand_id = ' + id;
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
  let query = 'SELECT id, image, short_name, gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku,color,short_description, long_description, status, seo_title, seo_description, top_product, new_arrival, featured_product, best_product FROM products WHERE category_id = ?';
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

  if (filters?.price && filters?.price?.length > 0) {
    filters?.price.forEach(priceRange => {
      const minPrice = priceRange?.value?.min;
      const maxPrice = priceRange?.value?.max;
      query += ' AND ((offer_price IS NOT NULL AND offer_price BETWEEN ? AND ?) OR (offer_price IS NULL AND price BETWEEN ? AND ?))';
      queryParams.push(minPrice, maxPrice, minPrice, maxPrice);
    });
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getByProductsSubcatId = (id, filters, callBack) => {
  let query = 'SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku,color,  short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products WHERE sub_category_id = ?';
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

  if (filters?.price && filters?.price?.length > 0) {
    filters?.price.forEach(priceRange => {
      const minPrice = priceRange?.value?.min;
      const maxPrice = priceRange?.value?.max;
      query += ' AND ((offer_price IS NOT NULL AND offer_price BETWEEN ? AND ?) OR (offer_price IS NULL AND price BETWEEN ? AND ?))';
      queryParams.push(minPrice, maxPrice, minPrice, maxPrice);
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
    `SELECT id, image, short_name,gallery, name, slug, category_id, sub_category_id, collection_id, brand_id, sku,color, short_description, long_description, status, seo_title, seo_description, top_product, new_arrival,featured_product, best_product FROM products LIMIT ${data.limit} OFFSET ${data.offset}`,
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
    `UPDATE products SET image = ?, short_name = ?, name = ?, slug = ?, category_id = ?, sub_category_id = ?, collection_id = ?, brand_id = ?, sku = ?,  color = ?, short_description = ?, long_description = ?, status = ?, seo_title = ?, seo_description = ?, top_product = ?, new_arrival = ?,featured_product =?, best_product = ?, gallery= ? WHERE id = ?`,
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
      data.color,
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

// Variants
export const getVariantsbyProductID = (id, callBack) => {
  db.query(
    `SELECT id, product_id, product_size,product_quantity, product_price, offer_price  FROM product_variants WHERE product_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results : null);
    }
  );
}


export const createVariant = (data, callBack) => {
  db.query(
    `INSERT INTO product_variants (product_id, product_size, product_quantity, product_price, offer_price) VALUES (?, ?, ?, ?, ?)`,
    [
      data.product_id,
      data.product_size,
      data.product_quantity,
      data.product_price,
      data.offer_price,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}


export const createPrdVariant = (product_id, variant_products, callBack) => {
  let resultsArray = [];
  let errorsArray = [];
  db.query(
    `DELETE FROM variant_products WHERE product_id = ?`,
    [product_id],
    (deleteError, deleteResults) => {
      if (deleteError) {
        return callBack(deleteError);
      }
      variant_products.forEach((variant_id, index) => {
        db.query(
          `SELECT * FROM variant_products WHERE product_id = ? AND variant_id = ?`,
          [product_id, variant_id],
          (selectError, selectResults) => {
            if (selectError) {
              errorsArray.push(selectError);
              // If there's an error in the select query, call the callback with the error
              if (index === variant_products.length - 1) {
                return callBack(errorsArray);
              }
            } else if (selectResults.length === 0) {
              // If no matching record is found, insert the new variant product
              db.query(
                `INSERT INTO variant_products (product_id, variant_id) VALUES (?, ?)`,
                [product_id, variant_id],
                (insertError, insertResults) => {
                  if (insertError) {
                    errorsArray.push(insertError);
                  } else {
                    resultsArray.push(insertResults);
                  }
                  // If this is the last item in the loop, call the callback with the results and errors
                  if (index === variant_products.length - 1) {
                    return callBack(errorsArray.length ? errorsArray : null, resultsArray);
                  }
                }
              );
            } else {
              // If a matching record is found, skip to the next iteration
              if (index === variant_products.length - 1) {
                return callBack(errorsArray.length ? errorsArray : null, resultsArray);
              }
            }
          }
        );
      });
    });
};
export const updateVariant = (data, id, callBack) => {
  db.query(
    `UPDATE product_variants SET product_id = ?, product_size = ?, product_quantity = ?, product_price = ?, offer_price = ? WHERE id = ?`,
    [
      data?.product_id,
      data?.product_size,
      data?.product_quantity,
      data?.product_price,
      data?.offer_price,
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

export const deleteVariant = (data, callBack) => {
  db.query(
    `DELETE FROM product_variants WHERE product_variants.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};


// Variant Size
export const getPrdVariantSize = (id, callBack) => {
  db.query(
    `SELECT * FROM product_variants WHERE product_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results : null);
    }
  );
}

// Product Variants

export const getPrdVariants = (id, callBack) => {
  const query = ` SELECT p.* FROM variant_products vp INNER JOIN products p ON vp.product_id = p.id WHERE vp.product_id = ? AND vp.variant_id != ? `;
  db.query(
    query,
    [id, id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results : null);
    }
  );
}


export const getProductList = (callBack) => {
  db.query(
    `SELECT * FROM products`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results : null);
    }
  );
}



export const getProductVariant = (id, callBack) => {
  db.query(
    `SELECT * FROM variant_products WHERE product_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results : null);
    }
  );
}


export const getVariantSize = (callBack) => {
  db.query(
    `SELECT id, name, status FROM variant_size`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results.length ? results : null);
    }
  );
}


export const createVariantSize = (data, callBack) => {
  db.query(
    `INSERT INTO variant_size (name, status) VALUES (?, ?)`,
    [
      data.name,
      data.status,
    ],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}


export const updateVariantSize = (data, id, callBack) => {
  db.query(
    `UPDATE variant_size SET name = ?, status = ? WHERE id = ?`,
    [
      data?.name,
      data?.status,
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

export const deleteVariantSize = (data, callBack) => {
  db.query(
    `DELETE FROM variant_size WHERE variant_size.id=?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};