import express from "express";
import "../src/database/index.js";
import cors from "cors";
import userRoutes from "./models/Users/users.router.js";
import categoriesRoutes from "./models/Categories/categories.router.js";
import subCategoriesRoutes from "./models/SubCategories/subCategories.router.js";
import childCategoriesRoutes from "./models/ChildCategories/childCategories.router.js";
import brandsRoutes from "./models/Brands/brands.router.js";
import productsRoutes from "./models/Products/products.router.js";
import ServerEnvironmentConfig from "./config/server.config.js";
import fileUpload from "express-fileupload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

let corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  "/v1",
  userRoutes,
  categoriesRoutes,
  subCategoriesRoutes,
  childCategoriesRoutes,
  brandsRoutes,
  productsRoutes
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
