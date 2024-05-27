import express from "express";
import "../src/database/index.js";
import cors from "cors";
import userRoutes from "./models/Users/users.router.js";
import categoriesRoutes from "./models/Categories/categories.router.js";
import subCategoriesRoutes from "./models/SubCategories/subCategories.router.js";
import childCategoriesRoutes from "./models/ChildCategories/childCategories.router.js";
import brandsRoutes from "./models/Brands/brands.router.js";
import ServerEnvironmentConfig from "./config/server.config.js";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

let corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  "/api.modenteo/v1",
  userRoutes,
  categoriesRoutes,
  subCategoriesRoutes,
  childCategoriesRoutes,
  brandsRoutes
);

app.get("/", (req, res) => {
  res.send("<h1>Api Working Fine</h1>");
});

app.listen(
  ServerEnvironmentConfig.server.line === "production"
    ? ServerEnvironmentConfig.server.live
    : ServerEnvironmentConfig.server.local,
  () => {
    console.log(
      `Server started on port ${
        ServerEnvironmentConfig.server.line === "production"
          ? ServerEnvironmentConfig.server.live
          : ServerEnvironmentConfig.server.local
      }`
    );
  }
);
