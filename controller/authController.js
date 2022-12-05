const { hashSync, compareSync } = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../models");
const jwt = require("jsonwebtoken")
const user = db.users;

module.exports = {
  login: async (req, res) => {
    try {
      const {email, password} = req.body
      const data = await user.findOne({ where: { email: email } });
      if (data === null) {
        return res.send({
          success: false,
          message: "invalid email or password",
          data: data,
        });
      }

      const match = compareSync(password, data.password)
      if (!match) {
        return res.send({
          success: false,
          message: "invalid email or password"
        });
      }

      const payload = {
        name: data.name,
        email: data.email
      }

      const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"})

      return res.send({
        success: true,
        message: "login successfull",
        token: token,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error,
        data: null,
      });
    }
  },
  register: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const { name, email, password } = req.body;
      const data = await user.create({
        name: name,
        email: email,
        password: hashSync(password, 10),
        roleId: 1,
      });
      res.send({
        success: true,
        message: "register is successfull",
        data: {
          name: data.name,
          email: data.email,
        },
      });
    } catch (error) {
      return next(err);
    }
  },
};
