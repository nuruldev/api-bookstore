const { validationResult } = require("express-validator");
const db = require("../models");
const user = db.users;

module.exports = {
  findAll: async (req, res) => {
    try {
      const data = await user.findAll();
      res.send({
        success: true,
        message: "List of users",
        data: data,
      });
    } catch (error) {
      res.send({
        success: false,
        message: err,
        data: null,
      });
    }
  },
  findById: async (req, res) => {
    try {
      const data = await user.findByPk(req.params.id);
      if (data === null) {
        res.send({
          success: false,
          message: "data not found",
          data: data,
        });
      } else {
        res.send({
          success: true,
          message: "detail of user",
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
      const data = await user.create({
        name: name,
      });
      res.send({
        success: true,
        message: "Create user is successfull",
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
      const data = await user.findByPk(id);
      if (data === null) {
        res.send({
          success: false,
          message: "Data not found",
          data: data,
        });
      } else {
        const updatedData = await user.update(
          { name: name },
          { where: { id: id } }
        );
        res.send({
          success: true,
          message: "Update user is successfull",
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
      const data = await user.findByPk(id);
      if (data === null) {
        res.send({
          success: false,
          message: "Data not found",
          data: data,
        });
      } else {
        const { name } = req.body;
        const deletedData = await user.destroy({
          where: { id: req.params.id },
        });
        res.send({
          success: true,
          message: "Delete user is successfull",
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
