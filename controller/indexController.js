const getToken = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const split = authorization.split(" ");
    const token = split[1];
    return res.send({
      token: token,
    });
  } catch (error) {
    return res.send({
      error: error,
    });
  }
};

module.exports = {
  getToken,
};
