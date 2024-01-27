const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const User = model("users");


exports.login = (req, res, next) => {
  const {phone, password="" } = req.body;
    
  User.findOne({ phone })
    .then((data) => {
      if (!data) throw new Error("invalid email or password");
      
      const checkPassword = bcrypt.compareSync(password, data.password);
      if (!checkPassword) throw new Error("invalid email or password");
      const { _id, isAdmin } = data;
      const token = jwt.sign({ _id, isAdmin }, process.env.KEY);
      res.status(200).json({ message: "done", token });
    })
    .catch((error) => next(error));
};

exports.user = (req, res, next) => {
  const { userName="admin", phone="01283456789", isAdmin=true } = req.body;

  const password = isAdmin ? "admin" : "";

  const hashPassword = bcrypt.hashSync(password, +process.env.BUFFER);

  const userData = new User({
    userName,
    password: hashPassword,
    phone,
    isAdmin,
  });
  userData
    .save()
    .then((data) => res.status(201).json({ message: "Done", data }))
    .catch((error) => next(error));
};


