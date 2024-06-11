import {
  createsettings,
  createhomesettings,
  deletehomesettings,
  deletesettings,
  getsetttings,
  gethomesettings,
} from "./settings.service.js";
import { tableNames } from "../../database/tables/index.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
export const createSettings = (req, res) => {
  const body = req.body;
  deletehomesettings((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    deletesettings((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      createhomesettings(body.home_settings, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        createsettings(body.section, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      });
    });
  });

};
export const settings = (req, res) => {
  getsetttings((err, settings) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    gethomesettings((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Database connection error",
        });
      }
      return res.status(200).json({
        settings: settings,
        home_settings: results
      });
    });
  });
}
export const settingshome = async (req, res) => {
  try {
    const servicecustomer = await getCustomerServiceByStatus();
    const fashion = await getFashionByStatus();
    const popular = await getPopularByStatus();
    const discount = await getDiscountByStatus();
    const spotlight = await getSpotlightByStatus();
    const banner = await getHeroBannerByStatus();

    return res.status(200).json({ customerservice: servicecustomer, fashion: fashion, discount: discount, popular: popular, spotlight: spotlight, banner: banner});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export const getCustomerServiceByStatus = () => {
  return new Promise((resolve, reject) => {
    getDataByStatus(tableNames.MANAGEWEBSITE.CUSTOMERSERVICE, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getFashionByStatus = () => {
  return new Promise((resolve, reject) => {
    getDataByStatus(tableNames.MANAGEWEBSITE.FASHIONPRODUCTS, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getPopularByStatus = () => {
  return new Promise((resolve, reject) => {
    getDataByStatus(tableNames.MANAGEWEBSITE.POPULARPRODUCTS, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}


export const getHeroBannerByStatus = () => {
  return new Promise((resolve, reject) => {
    getDataByStatus(tableNames.MANAGEWEBSITE.BANNER, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getSpotlightByStatus = () => {
  return new Promise((resolve, reject) => {
    getDataByStatus(tableNames.MANAGEWEBSITE.SPOTLIGHT, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getDiscountByStatus = () => {
  return new Promise((resolve, reject) => {
    getDataByStatus(tableNames.MANAGEWEBSITE.DISCOUNTBANNER, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}
