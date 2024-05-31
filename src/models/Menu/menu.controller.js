import {
  getCategoriesWithSubcategory,getSubcategorywithChildCategories
} from "./menu.service.js";

export const getCategoryWithSubcategory = (req, res) => {
  getCategoriesWithSubcategory(async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    let response = {};

    for (const cat of results) {
      if (response[cat?.id]) {
        response[cat?.id].subCategory.push({
          id: cat?.subcategoryID,
          name: cat?.subcatName,
          slug: cat?.subcatSlug,
        });
      } else {
        response[cat?.id] = {
          id: cat?.id,
          categoryName: cat?.name,
          categorySlug: cat?.slug,
          image: cat?.image,
          isOpen: false,
          subCategory: [
            {
              id: cat?.subcategoryID,
              name: cat?.subcatName,
              slug: cat?.subcatSlug,
            },
          ],
        };
      }
    }
    const responseArray = Object.values(response);
    return res.status(200).json({
      response: responseArray,
    });
  });
};

export const getSubcategoryWithChildcategory = (req, res) => {
  getSubcategorywithChildCategories(async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    let response = {};

    for (const subcat of results) {
      if (response[subcat?.id]) {
        response[subcat?.id].childCategory.push({
          id: subcat?.childcatID,
          name: subcat?.childcatName,
          slug: subcat?.childcatSlug,
        });
      } else {
        response[subcat?.id] = {
          id: subcat?.id,
          categoryName: subcat?.name,
          categorySlug: subcat?.slug,
          image: subcat?.image,
          isOpen: false,
          childCategory: [
            {
              id: subcat?.childcatID,
              name: subcat?.childcatName,
              slug: subcat?.childcatSlug,
            },
          ],
        };
      }
    }
    const responseArray = Object.values(response);
    return res.status(200).json({
      response: responseArray,
    });
  });
};
