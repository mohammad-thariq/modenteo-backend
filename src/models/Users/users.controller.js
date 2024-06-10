import {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmailAndType,
  getUserByUserType,
  getUserTodayOrders,
  getOrderCount,
  getCartCount,
  getWishlistCount
} from "./users.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserEnvironmentConfig from "../../config/database.config.js";
import { validateType } from "./enum/users.enum.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import { tableNames } from "../../database/tables/index.js";
import { userNotificationMessage } from "../../Constant/ErrorAndSuccessBoundry/user.message.js";
import { commonNotificationMessage } from "../../Constant/CommonESB/common.message.js";

const { sign } = jwt;
const { hashSync, genSaltSync, compare } = bcrypt;

export const createUser = (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  getUserByUserEmail(body.email, async (err, results) => {
    console.log(results, "results");
    if (results) {
      return await res.status(404).json({
        error: userNotificationMessage.error.register.email,
      });
    }
  });

  if (!validateType.includes(body.type)) {
    return res.status(404).json({
      error: `${userNotificationMessage.error.register.type
        } ${validateType.join(", ")}`,
    });
  }

  create(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    return res.status(200).json({
      message: userNotificationMessage.success.register,
      data: results,
    });
  });
};

export const login = (req, res) => {
  const body = req.body;

  if (!validateType.includes(body.type)) {
    return res.status(404).json({
      error: `${userNotificationMessage.error.register.type
        } ${validateType.join(", ")}`,
    });
  }

  getUserByUserEmailAndType(body.email, body.type, async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    if (!results) {
      return res.status(401).json({
        error: userNotificationMessage.error.login,
      });
    }
    const result = await compare(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign(
        { result: results },
        UserEnvironmentConfig.jwt_key,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        message: userNotificationMessage.success.login,
        data: results,
        token: jsontoken,
      });
    } else {
      return res.status(401).json({
        error: userNotificationMessage.error.login,
      });
    }
  });
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  getUserByUserId(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    if (!results) {
      return res.status(404).json({
        error: userNotificationMessage.error.not_found,
      });
    }
    results.password = undefined;
    return res.status(200).json({
      data: results,
    });
  });
};

export const getUserByEmail = (req, res) => {
  const email = req.params.email;
  getUserByUserEmail(email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    if (!results) {
      return res.status(404).json({
        error: userNotificationMessage.error.not_found,
      });
    }
    return res.status(200).json({
      data: results,
    });
  });
};

export const getUserByType = (req, res) => {
  const type = req.params.type;
  getUserByUserType(type, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    if (!results) {
      return res.status(404).json({
        error: userNotificationMessage.error.not_found,
      });
    }
    return res.status(200).json({
      user: results,
    });
  });
};

export const getAllUsers = (req, res) => {
  const query = req.query;
  getPaginated(query, tableNames.USERS, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getUsers(result, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: commonNotificationMessage.error.server,
        });
      }
      return res.status(200).json({
        data: results,
        pagination: {
          totalPage: pagination,
          page: Number(query.page),
          limit: Number(query.limit),
        },
      });
    });
  });
};

export const updateUsers = (req, res) => {
  const params = req.params;
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  if (!validateType.includes(body.type)) {
    return res.status(404).json({
      error: `${userNotificationMessage.error.register.type
        } ${validateType.join(", ")}`,
    });
  }

  updateUser(body, params.id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    return res.status(200).json({
      message: userNotificationMessage.success.update,
    });
  });
};

export const deleteUserById = (req, res) => {
  const data = req.params;
  deleteUser(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    if (!results.affectedRows) {
      return res.status(404).json({
        error: userNotificationMessage.error.not_found,
      });
    }
    return res.status(200).json({
      message: userNotificationMessage.success.delete,
    });
  });
};
export const getUserDashboard = (req, res) => {
  const id = req.params.id;
  getUserTodayOrders(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: commonNotificationMessage.error.server,
      });
    }
    if (!results) {
      return res.status(404).json({
        error: userNotificationMessage.error.not_found,
      });
    }

    // Getting order count
    getOrderCount(id, (err, orderCount) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: commonNotificationMessage.error.server,
        });
      }

      // Getting cart count
      getCartCount(id, (err, cartCount) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: commonNotificationMessage.error.server,
          });
        }

        // Getting wishlist count
        getWishlistCount(id, (err, wishlistCount) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: commonNotificationMessage.error.server,
            });
          }
          // Sending response with all counts
          return res.status(200).json({
            orders: results,
            order_count: orderCount[0].order_count,
            cart_count: cartCount[0].cart_count,
            wishlist_count: wishlistCount[0].wishlist_count,
          });
        });
      });
    });
  });
}
