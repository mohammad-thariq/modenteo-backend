import { tableNames } from "../../database/tables/index.js";
import { getDataByStatus } from "../../middleware/getDataByStatus/index.js";
import { getPaginated } from "../../middleware/pagination/paginated.js";
import {
  create,
  deletePage,
  getByPagesId,
  getPages, getByPagesSlug,
  updatePage,
} from "./pages.service.js";

export const createPages = (req, res) => {
  const body = req.body;
  create(body, (err, results) => {
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
};

export const getPagesById = (req, res) => {
  const id = req.params.id;
  getByPagesId(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "Record not found",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

export const getPagesBySlug = (req, res) => {
  const slug = req.params.slug;
  getByPagesSlug(slug, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "Record not found",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

export const getPageByStatus = (req, res) => {
  getDataByStatus(tableNames.PAGES, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Database connection error",
      });
    }
    return res.status(200).json({
      pages: results,
    });
  });
};

export const getAllPages = (req, res) => {
  const query = req.query;

  getPaginated(query, tableNames.PAGES, (err, result, pagination) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    getPages(result, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        pages: results,
        pagination: {
          totalPage: pagination,
          page: Number(query.page),
          limit: Number(query.limit),
        },
      });
    });
  });
};

export const updatePagesById = (req, res) => {
  const params = req.params;
  const body = req.body;
  updatePage(body, params.id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Updated successfully",
    });
  });
};

export const deletePagesById = (req, res) => {
  const data = req.params;
  deletePage(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (!results.affectedRows) {
      return res.status(404).json({
        success: 0,
        message: "Record not found",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Pages deleted successfully",
    });
  });
};
