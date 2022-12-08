const { validationResult } = require("express-validator");
const { images, sequelize } = require("../models");
const db = require("../models");
const book = db.books;
const image = db.images;
const category = db.categories;

module.exports = {
  findAll: async (req, res) => {
    try {
      const data = await book.findAll({
        attributes: [
          "id",
          "name",
          "author",
          "publisher",
          "price",
          "stock",
          "thick",
          "status",
        ],
        include: [{ model: image, attributes: ["name"] }, { model: category, attributes: ["name"] }],
      });
      console.log(data);
      return res.send({
        success: true,
        message: "List of books",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: error,
        data: null,
      });
    }
  },
  findById: async (req, res) => {
    try {
      const data = await book.findByPk(req.params.id, {
        attributes: [
          "id",
          "name",
          "author",
          "publisher",
          "price",
          "stock",
          "thick",
          "status",
        ],
        include: [
          { model: image, attributes: ["name"] },
          { model: category, attributes: ["name"] },
        ],
      });
      if (data === null) {
        res.send({
          success: false,
          message: "data not found",
          data: data,
        });
      } else {
        res.send({
          success: true,
          message: "detail of book",
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
  create: async (req, res) => {
    const t = await sequelize.transaction()
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const {
        name,
        author,
        publisher,
        price,
        stock,
        thick,
        status,
        categoryId,
        desc
      } = req.body;

      const file = req.file;
      // console.log(file)

      const data = await book.create({
        name: name,
        author: author,
        publisher: publisher,
        price: price,
        stock: stock,
        thick: thick,
        status: status,
        category_id: categoryId,
        desc: desc
      }, {
        transaction: t
      });

      await image.create({
        book_id: data.id,
        name: file.filename,
        mime: file.mimetype,
      }, {
        transaction: t
      });

      await t.commit()

      return res.send({
        success: true,
        message: "Create book is successfull",
        data: data,
      });
    } catch (error) {

      await t.rollback()
      console.log(error)
      return res.status(500).send({
        success: false,
        message: "filed to create book",
        errors: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const {
        name,
        author,
        publisher,
        price,
        stock,
        thick,
        status,
        categoryId,
      } = req.body;
      const id = req.params.id;
      const data = await book.findByPk(id);
      if (data === null) {
        res.send({
          success: false,
          message: "data not found",
          data: data,
        });
      } else {
        const updatedData = await book.update(
          {
            name: name,
            author: author,
            publisher: publisher,
            price: price,
            stock: stock,
            thick: thick,
            status: status,
            categoryId: categoryId,
          },
          { where: { id: id } }
        );
        res.send({
          success: true,
          message: "update book is successfull",
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
      const data = await book.findByPk(id, {
        attributes: [
          "id"
        ],
        include: [
          { model: image, attributes: ["name"] }
        ],
      });
      if (data === null) {
        res.send({
          success: false,
          message: "data not found",
          data: data,
        });
      } else {
        const deletedData = await book.destroy({
          where: { id: req.params.id },
        });
        // let path = `public/images/${data}`;
        console.log(data)

        res.send({
          success: true,
          message: "delete book is successfull",
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
