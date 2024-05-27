import dotenv from "dotenv";
dotenv.config();

const DataBaseEnvironmentConfig = {
  jwt_key: process.env.JWT_SECRET_KEY,
  local: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  },
  live: {
    host: process.env.DATABASE_PRO_HOST,
    user: process.env.DATABASE_PRO_USER,
    password: process.env.DATABASE_PRO_PASSWORD,
    database: process.env.DATABASE_PRO_DB,
  },
};

export default DataBaseEnvironmentConfig;
