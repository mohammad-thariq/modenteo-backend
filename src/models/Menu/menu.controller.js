import { getCategoriesWithSubcategory } from "./menu.service.js";
import { tableNames } from "../../database/tables/index.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";

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


export const getSeasonCollections = (req, res) => {
  getDataByStatus(tableNames.COLLECTIONS, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      response: results,
    });
  });
}

export const getNew = (req, res) => {
  let newMenu = [{ id: "1", name: "New Arrivals", slug: "new-arrivals" }, { id: "2", name: "Top Products", slug: "top-products" }, { id: "3", name: "Best Selling", slug: "best-selling" }, { id: "4", name: "Featured Products", slug: "featured-products" }];
  return res.status(200).json({
    response: newMenu,
  });

}