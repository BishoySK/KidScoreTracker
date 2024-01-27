const { model } = require("mongoose");

const User = model("users");

exports.addPhone = (req, res, next) => {
  const { phone } = req.body;
  User.findOne({ phone })
    .then((data) => {
      if (data) throw new Error("Phone already exists", { cause: 411 });
      next();
    })
    .catch((error) => next(error));
};

exports.updatePhone = (req, res, next) => {
  const {_id, phone } = req.body;
  User.findOne({ phone, _id: { $ne: _id } })
    .then((data) => {
      if (data) throw new Error("Phone already exists", { cause: 411 });
      next();
    })
    .catch((error) => next(error));
};
