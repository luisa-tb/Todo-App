const { body } = require("express-validator");

const tareaValidations = [
  body("titulo")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ max: 400 })
    .withMessage("La descripción no puede superar los 400 caracteres"),
  body("fecha_vencimiento")
    .notEmpty()
    .withMessage("La fecha de vencimiento es obligatoria")
    .isISO8601()
    .withMessage("Formato de fecha inválido (YYYY-MM-DD)"),
];

module.exports = { tareaValidations };
