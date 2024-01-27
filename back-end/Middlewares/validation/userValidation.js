const { body } = require("express-validator");

exports.addValidate = [
  body("userName")
    .notEmpty()
    .withMessage("User Name is required")
    .isLength({ min: 2 })
    .withMessage("User Name must be at least 2 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must have 11 digits"),
];

exports.updateValidate = [
  body("userName")
    .notEmpty()
    .withMessage("User Name is required")
    .isLength({ min: 2 })
    .withMessage("User Name must be at least 2 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must have 11 digits"),
];
