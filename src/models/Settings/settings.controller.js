import {
  createsettings,
  createhomesettings,
  deletehomesettings,
  deletesettings,
  getsetttings,
  gethomesettings,
} from "./settings.service.js";
import { tableNames } from "../../database/tables/index.js";
import { getDataByCategoryType } from "../../middleware/getDataByStatus/index.js";

// Website Settings
export const createSettings = (req, res) => {
  const body = req.body;
  deletehomesettings('website',(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    deletesettings('website',(err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      createhomesettings(body.home_settings, 'website', (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        createsettings(body.section, 'website', (err, results) => {
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
  getsetttings('website',(err, settings) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    gethomesettings('website',(err, results) => {
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
};

export const settingshome = async (req, res) => {
  try {
    const servicecustomer = await getCustomerServiceByStatus('website');
    const fashion = await getFashionByStatus('website');
    const popular = await getPopularByStatus('website');
    const discount = await getDiscountByStatus('website');
    const spotlight = await getSpotlightByStatus('website');
    const banner = await getHeroBannerByStatus('website');

    return res.status(200).json({ customerservice: servicecustomer, fashion: fashion, discount: discount, popular: popular, spotlight: spotlight, banner: banner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Category Settings
export const createSettingsCategory = (req, res) => {
  const type = req.params.type;
  const body = req.body;
  deletehomesettings(type,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    deletesettings(type,(err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      createhomesettings(body.home_settings, type, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        createsettings(body.section, type, (err, results) => {
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

export const settingscategory = (req, res) => {
  const type = req.params.type;

  getsetttings(type,(err, settings) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    gethomesettings(type,(err, results) => {
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
};

export const settingscategoryhome = async (req, res) => {
  const type = req.params.type;

  try {
    const servicecustomer = await getCustomerServiceByStatus(type);
    const fashion = await getFashionByStatus(type);
    const popular = await getPopularByStatus(type);
    const discount = await getDiscountByStatus(type);
    const spotlight = await getSpotlightByStatus(type);
    const banner = await getHeroBannerByStatus(type);

    return res.status(200).json({ customerservice: servicecustomer, fashion: fashion, discount: discount, popular: popular, spotlight: spotlight, banner: banner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getCustomerServiceByStatus = (type) => {
  return new Promise((resolve, reject) => {
    getDataByCategoryType(tableNames.MANAGEWEBSITE.CUSTOMERSERVICE, type, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getFashionByStatus = (type) => {
  return new Promise((resolve, reject) => {
    getDataByCategoryType(tableNames.MANAGEWEBSITE.FASHIONPRODUCTS, type, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getPopularByStatus = (type) => {
  return new Promise((resolve, reject) => {
    getDataByCategoryType(tableNames.MANAGEWEBSITE.POPULARPRODUCTS, type, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}


export const getHeroBannerByStatus = (type) => {
  return new Promise((resolve, reject) => {
    getDataByCategoryType(tableNames.MANAGEWEBSITE.BANNER, type, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getSpotlightByStatus = (type) => {
  return new Promise((resolve, reject) => {
    getDataByCategoryType(tableNames.MANAGEWEBSITE.SPOTLIGHT, type, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}

export const getDiscountByStatus = (type) => {
  return new Promise((resolve, reject) => {
    getDataByCategoryType(tableNames.MANAGEWEBSITE.DISCOUNTBANNER, type, (err, results) => {
      if (err) {
        console.log(err);
        reject("Database connection error");
      } else {
        resolve(results);
      }
    });
  });
}
