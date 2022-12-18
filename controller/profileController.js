const { validationResult } = require("express-validator");
const db = require("../models");
const profile = db.profiles;
const user = db.users;
const { getUserAuth } = require("../utils/helper");

module.exports = {
  findById: async (req, res) => {
    try {
      const data = await getUserAuth(req, res);
      if (data === null) {
        res.send({
          success: false,
          message: "Unauthorize",
        });
      } else {
        const currentUser = await profile.findOne({
          where: {
            email: data.email,
          },
          attributes: [
            "user_id",
            "gender",
            "birthdate",
            "province",
            "regency",
            "district",
            "village",
            "pos_code",
            "phone",
            "address",
            "picture",
          ],
          include: {
            model: user,
            attributes: ["name", "email"],
          },
        });
        res.send({
          success: true,
          message: "detail of user",
          data: currentUser,
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
  update: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const user = await getUserAuth(req, res);
      const data = await profile.findOne({ where: { user_id: user.id } });
      const {
        gender,
        birthdate,
        province,
        regency,
        district,
        village,
        pos_code,
        phone,
        address,
      } = req.body;
      const file = req.file;
      let filename = data.picture;
      if (file !== undefined) {
        filename = file.filename;
      }

      let result;
      if (data == null) {
        result = await profile.create({
          user_id: user.id,
          gender: gender,
          birthdate: birthdate,
          province: province,
          regency: regency,
          district: district,
          village: village,
          pos_code: pos_code,
          phone: phone,
          address: address,
          picture: filename,
        });
      } else {
        result = await profile.update(
          {
            user_id: user.id,
            gender: gender,
            birthdate: birthdate,
            province: province,
            regency: regency,
            district: district,
            village: village,
            pos_code: pos_code,
            phone: phone,
            address: address,
            picture: filename,
          },
          { where: { user_id: user.id } }
        );
      }

      res.send({
        success: true,
        message: "Update user is successfull",
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error,
        data: null,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await profile.findByPk(id);
      if (data === null) {
        res.send({
          success: false,
          message: "Data not found",
          data: data,
        });
      } else {
        const { name } = req.body;
        const deletedData = await profile.destroy({
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
