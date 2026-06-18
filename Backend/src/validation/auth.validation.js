const { body } = require("express-validator");

const registroValidations = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("apellido").notEmpty().withMessage("El apellido es obligatorio"),
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Mínimo 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe contener al menos una mayúscula")
    .matches(/[0-9]/)
    .withMessage("Debe contener al menos un número")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Debe contener al menos un carácter especial"),
];

module.exports = { registroValidations };
