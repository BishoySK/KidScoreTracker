const { model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = model("users");

exports.getUserData = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id }, { password: 0, isAdmin: 0 })
    .then((data) => {
      if (!data) throw new Error("User not Found");
      res.status(200).json({ message: "Done", data });
    })
    .catch((err) => next(err));
};

/*
Admin
*/

exports.getAllUsers = (req, res, next) => {
  let { page, isModerator = false, searchParams = "" } = req.query;
  if (!page || page < 0) page = 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  User.find(
    { isAdmin: isModerator, userName: { $regex: searchParams, $options: "i" } },
    { password: 0, isAdmin: 0 }
  )
    .sort({ userName: 1 })
    .skip(skip)
    .limit(limit)
    .then(async (data) => {
      let totalPages = await User.countDocuments({});
      totalPages = Math.ceil(totalPages / limit);
      res.status(200).json({ message: "Done", data, totalPages });
    })
    .catch((err) => next(err));
};


exports.getUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findById({ _id }, { password: 0 })
    .then((data) => {
      if (!data) throw new Error("User not Found");
      res.status(200).json({ message: "Done", data });
    })
    .catch((err) => next(err));
};

exports.addUser = (req, res, next) => {
  const { userName, phone, isAdmin, count } = req.body;

  const password = isAdmin ? "admin" : "";

  const hashPassword = bcrypt.hashSync(password, +process.env.BUFFER);

  const userData = new User({
    userName,
    password: hashPassword,
    phone,
    count,
    isAdmin,
  });
  userData
    .save()
    .then(() => res.status(201).json({ message: "Done" }))
    .catch((error) => next(error));
};

exports.updateUser = (req, res, next) => {

  const {_id, userName, phone, isAdmin, count } = req.body;

  User.updateOne({ _id }, { $set: { userName, phone, isAdmin, count } })
    .then(() => {
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};

exports.deleteUser = (req, res, next) => {
  const { _id } = req.query;

  User.findByIdAndDelete({ _id })
    .then((data) => {
      if (!data) throw new Error("delete Fail");
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => next(err));
};
