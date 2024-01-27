const { Router } = require("express");
const accountController = require("../Controllers/account.controller");
const validate = require("../Middlewares/validation/validate");
const accountValidation = require("../Middlewares/validation/accountValidation");

const router = Router();


router.post(
  "/Login",
  accountValidation.LoginValidate,
  validate,
  accountController.login
);

router.get(
  "/admin",
  accountController.user
);


module.exports = router;