const { validationResult } = require("express-validator");
const db = require("../models");
const category = db.categories;

module.exports = {
  findAll: async (req, res) => {
    try {
      const data = await category.findAll();
      res.send({
        success: true,
        message: "List of categories",
        data: data,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error,
        data: null,
      });
    }
  },
  findById: async (req, res) => {
    try {
      const data = await category.findByPk(req.params.id);
      if (data === null) {
        res.send({
          success: false,
          message: "data not found",
          data: data,
        });
      } else {
        res.send({
          success: true,
          message: "detail of category",
          data: data,
        });
      }
    } catch (error) {
      res.send({
        success: false,
        message: err,
        data: null,
      });
    }
  },
  create: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const { name } = req.body;
      const data = await category.create({
        name: name,
      });
      res.send({
        success: true,
        message: "Create category is successfull",
        data: data,
      });
    } catch (error) {
      return next(err);
    }
  },
  update: async (req, res) => {
    try {
      const { name } = req.body;
      const id = req.params.id;
      const data = await category.findByPk(id);
      if (data === null) {
        res.send({
          success: false,
          message: "Data not found",
          data: data,
        });
      } else {
        const updatedData = await category.update(
          { name: name },
          { where: { id: id } }
        );
        res.send({
          success: true,
          message: "Update category is successfull",
          data: updatedData,
        });
      }
    } catch (error) {
      res.send({
        success: false,
        message: error,
        data: null,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await category.findByPk(id);
      if (data === null) {
        res.send({
          success: false,
          message: "Data not found",
          data: data,
        });
      } else {
        const { name } = req.body;
        const deletedData = await category.destroy({
          where: { id: req.params.id },
        });
        res.send({
          success: true,
          message: "Delete category is successfull",
          data: deletedData,
        });
      }
    } catch (error) {
      res.send({
        success: false,
        message: error,
        data: null,
      });
    }
  },
};
