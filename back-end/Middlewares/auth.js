const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const User = model("users");

exports.authentication = (req, res, next) => {
  try {
    if (!req.get("authorization"))
      throw new Error("Access Denied..", { cause: 401 });

    const token = req.get("authorization").split(" ")[1];

    const { _id } = jwt.verify(token, process.env.KEY);

    User.findById(_id)
      .then((data) => {
        if (!data) throw new Error("your email has not Found");
        req.user = data;
        next();
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

exports.authorization = (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) throw new Error("not authorization", { cause: 403 });
    next();
  } catch (error) {
    next(error);
  }
};