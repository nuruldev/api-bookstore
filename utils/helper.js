const db = require("../models")
const user = db.users;
const jwt = require("jsonwebtoken");

const getUserAuth = async (req, res) => {
  const string = req.headers.authorization;
  const arrStr = string.split(" ");
  const payload = jwt.verify(arrStr[1], process.env.SECRET_KEY);
  const data = await user.findOne({
    where: { email: payload.email },
    attributes: ["id","name", "email", "roleId"],
  });

  return data
}

module.exports = {
  getUserAuth
}