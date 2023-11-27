const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  let token = req.get("Authorization");

  try {
    if (!token) {
      const err = new Error("Not Authenticated");
      err.statusCode = 401;
      throw err;
    }
    token = token.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      const err = new Error("Not Authenticated");
      err.statusCode = 401;
      throw err;
    }
    req.userId = verify.userId;
    next();
  } catch (err) {
    next(err);
  }
};
