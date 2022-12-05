const { body } = require("express-validator");

const categoryCheck = () => {
  return [body("name").notEmpty().withMessage("name is not empty")];
};

const registerCheck = () => {
  return [
    body("name").notEmpty().withMessage("name is not empty"),
    body("email").notEmpty().withMessage("email is not empty").isEmail(),
    body("password").notEmpty().withMessage("email is not empty").isLength({min:6}).withMessage("must be at least 5 char")
  ];
};

const loginCheck = () => {
  return [
    body("email").notEmpty().withMessage("email is not empty").isEmail(),
    body("password").notEmpty().withMessage("password is not empty")
  ];
}

const bookCheck = () => {
  return [
    body("name").notEmpty().withMessage("name is not empty"),
    body("author").notEmpty().withMessage("author is not empty"),
    body("publisher").toLowerCase().notEmpty().withMessage("publisher is not empty"),
    body("price").notEmpty().withMessage("price is not empty").isNumeric(),
    // body("stock").notEmpty().withMessage("stock is not empty").isNumeric(),
    body("thick").notEmpty().withMessage("thick is not empty").isNumeric(),
    body("status").notEmpty().withMessage("status is not empty"),
    body("categoryId").notEmpty().withMessage("category is not empty")
  ]
}

const profileCheck = () => {
  return [
    body("gender").notEmpty().withMessage("gender is not empty"),
    body("phone").notEmpty().withMessage("phone is not empty"),
    body("birthdate").isDate(),
    body("address").notEmpty().withMessage("address is not empty")
  ]
}

module.exports = {
  categoryCheck,
  registerCheck,
  loginCheck,
  bookCheck,
  profileCheck
};
