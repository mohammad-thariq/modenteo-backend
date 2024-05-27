import { createConnection } from "mysql";
import ServerEnvironmentConfig from "../config/server.config.js";
import DataBaseEnvironmentConfig from "../config/database.config.js";

const dbConfig =
  ServerEnvironmentConfig.server.line === "production"
    ? DataBaseEnvironmentConfig.live
    : DataBaseEnvironmentConfig.local;

const db = createConnection({
  ...dbConfig,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as ID", db.threadId);
});

export default db;
