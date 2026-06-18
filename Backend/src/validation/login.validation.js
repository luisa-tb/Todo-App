const { body } = require("express-validator");

const loginValidations = [
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

module.exports = { loginValidations };
