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
  let newMenu = [{ id: "1", name: "New Arrivals", slug: "new-arrivals", image: "https://saisaravanane.com/frontend/uthr/assets/img/headerIcons/New.jpg" }, { id: "2", name: "Top Products", slug: "top-products", image: "https://saisaravanane.com/frontend/uthr/assets/img/others/rectangle-50-bg.png" }, { id: "3", name: "Best Selling", slug: "best-selling", image: "https://saisaravanane.com/frontend/uthr/assets/img/product/big-product/mask-group.png" }, { id: "4", name: "Featured Products", slug: "featured-products", image: "https://i.ezbuy.sg/Fr42grQtOhrTMEKt4gzucPtv3RLt" }];
  return res.status(200).json({
    response: newMenu,
  });

}