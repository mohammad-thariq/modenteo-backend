import db from "../../database/index.js";

export const getCategoriesWithSubcategory = (callBack) => {
  db.query(
    `SELECT c.id, c.slug, c.name, c.image, s.id as subcategoryID, s.name as subcatName, s.slug as subcatSlug FROM categories c LEFT JOIN sub_categories s ON c.id = s.category_id where c.status = 1 and s.status=1;`,
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};
