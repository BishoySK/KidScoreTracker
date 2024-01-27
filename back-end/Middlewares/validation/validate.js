const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const {errors} = validationResult(req);

  if (errors.length) {
    const errorData = errors.reduce(
      (currentIndex, item) => item.msg+"," + currentIndex,
      ""
    );
    return next(new Error(errorData, { cause: 400 }));
  }
  next();
};