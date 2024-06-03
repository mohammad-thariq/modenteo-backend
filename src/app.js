import express from "express";
import "../src/database/index.js";
import path from "path";
import cors from "cors";
import userRoutes from "./models/Users/users.router.js";
import menuRoutes from "./models/Menu/menu.router.js";
import categoriesRoutes from "./models/Categories/categories.router.js";
import subCategoriesRoutes from "./models/SubCategories/subCategories.router.js";
import childCategoriesRoutes from "./models/ChildCategories/childCategories.router.js";
import brandsRoutes from "./models/Brands/brands.router.js";
import productsRoutes from "./models/Products/products.router.js";
import BannerRoutes from "./models/ManageWebsite/HomePageBaner/homePageBanner.router.js"
import SpotLightRoutes from "./models/ManageWebsite/SpotLight/spotLight.router.js"
import ServiceRoutes from "./models/ManageWebsite/CustomerService/service.router.js"
import ServerEnvironmentConfig from "./config/server.config.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
const publicPath = path.join(__dirname, "../public");
// app.use(express.static(publicPath));

let corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  "/v1",
  userRoutes,
  menuRoutes,
  categoriesRoutes,
  subCategoriesRoutes,
  childCategoriesRoutes,
  brandsRoutes,
  productsRoutes,
  BannerRoutes,
  SpotLightRoutes,
  ServiceRoutes
);
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.get("/", (req, res) => {
  res.send("<h1>Api Working Fine</h1>");
});
// app.get('/upload/:imageName', (req, res) => {
//   const imageName = req.params.imageName;
//   console.log(imageName,'imageName');
//   console.log(__dirname,'__dirname');
// res.send("<p>imageName-"+imageName+"</p><p>__dirname-"+__dirname+"</p>")
//   // Send the image file
//   // res.sendFile(__dirname + `/upload/${imageName}`);
// });

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
