const UserModel = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");

const TokenVerify = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    // const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: "Token is Expire Please login",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
};

module.exports = TokenVerify;
