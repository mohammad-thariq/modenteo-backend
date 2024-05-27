import dotenv from "dotenv";
dotenv.config();

const ServerEnvironmentConfig = {
  server: {
    line: process.env.MODENTEO_SERVER_LINE,
    local: process.env.MODENTEO_SERVER_START_LOCAL,
    live: process.env.MODENTEO_SERVER_START_LIVE,
  },
};

export default ServerEnvironmentConfig;
