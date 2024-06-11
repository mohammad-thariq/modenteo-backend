import {
  createsettings,
  createhomesettings,
  deletehomesettings,
  deletesettings,
  getsetttings,
  gethomesettings,
} from "./settings.service.js";

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

