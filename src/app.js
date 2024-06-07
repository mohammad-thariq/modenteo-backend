import express from "express";
import "../src/database/index.js";
import path from "path";
import cors from "cors";
import userRoutes from "./models/Users/users.router.js";
import menuRoutes from "./models/Menu/menu.router.js";
import cartRoutes from "./models/Cart/cart.router.js";
import wishlistRoutes from "./models/Wishlist/wishlist.router.js";
import categoriesRoutes from "./models/Categories/categories.router.js";
import subCategoriesRoutes from "./models/SubCategories/subCategories.router.js";
import collectionsRoutes from "./models/Collections/collections.router.js";
import brandsRoutes from "./models/Brands/brands.router.js";
import productsRoutes from "./models/Products/products.router.js";
import BannerRoutes from "./models/ManageWebsite/HomePageBaner/homePageBanner.router.js";
import SpotLightRoutes from "./models/ManageWebsite/SpotLight/spotLight.router.js";
import ServiceRoutes from "./models/ManageWebsite/CustomerService/service.router.js";
import ServerEnvironmentConfig from "./config/server.config.js";
import DiscountRoutes from "./models/ManageWebsite/DiscountBanner/discountBanner.router.js";
import PopularProductsRoutes from "./models/ManageWebsite/PopularProducts/popularProducts.router.js";
import FashionProductsRoutes from "./models/ManageWebsite/FashionProducts/fashions.router.js";
import OrdersRoutes from "./models/Orders/orders.router.js";
import OrderItemsRoutes from "./models/OrderItems/orderItems.router.js";
import UserAddressRoutes from "./models/UserAddress/userAddress.router.js"
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";

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
  menuRoutes,
  cartRoutes,
  wishlistRoutes,
  categoriesRoutes,
  subCategoriesRoutes,
  collectionsRoutes,
  brandsRoutes,
  productsRoutes,
  BannerRoutes,
  SpotLightRoutes,
  ServiceRoutes,
  DiscountRoutes,
  PopularProductsRoutes,
  FashionProductsRoutes,
  OrdersRoutes,
  OrderItemsRoutes,
  UserAddressRoutes
);
// app.use('/upload', express.static(path.join(__dirname, 'upload')));

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
