const { Router } = require("express");
const userController = require("../Controllers/user.controller");
const validate = require("../Middlewares/validation/validate");
const { authorization } = require("../Middlewares/auth");
const userValidation = require("../Middlewares/validation/userValidation");
const checkPhone = require("../Middlewares/services/uniquePhone");

const router = Router();

router.route("/user").get(userController.getUserData);

router
  .route("/users")
  .all(authorization)
  .get(userController.getAllUsers)
  .post(
    checkPhone.addPhone,
    userValidation.addValidate,
    validate,
    userController.addUser
  )
  .patch(
    checkPhone.updatePhone,
    userValidation.updateValidate,
    validate,
    userController.updateUser
  )
  .delete(userController.deleteUser);


  router.get("/users/:_id",userController.getUserById)


module.exports = router;
