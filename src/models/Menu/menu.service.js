import db from "../../database/index.js";

export const getCategoriesWithSubcategory = (callBack) => {
  db.query(
    `SELECT c.id, c.slug, c.name, c.image, s.id as subcategoryID, s.name as subcatName, s.slug as subcatSlug FROM categories c LEFT JOIN sub_categories s ON c.id = s.category_id where c.status = 1 and s.status=1;`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export const getSubcategorywithChildCategories = (callBack) => {
  db.query(
    `SELECT s.id, s.slug, s.name, s.image, c.id as childcatID, c.name as childcatName, c.slug as childcatSlug FROM sub_categories s LEFT JOIN child_categories c ON s.id = c.sub_category_id where s.status = 1 and c.status=1;`,
    [],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};