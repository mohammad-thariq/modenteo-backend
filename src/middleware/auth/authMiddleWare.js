import jwt from "jsonwebtoken";
import DataBaseEnvironmentConfig from "../../config/database.config.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, DataBaseEnvironmentConfig.jwt_key, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
