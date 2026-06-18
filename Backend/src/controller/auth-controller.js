const { validationResult } = require("express-validator");
const {
  registroService,
  recuperarPasswordService,
} = require("../service/auth.service");

const registro = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { nombre, apellido, email, password } = req.body;
    const usuario = await registroService(nombre, apellido, email, password);
    return res
      .status(201)
      .json({ mensaje: "Usuario registrado correctamente", usuario });
  } catch (error) {
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
};

const recuperarPassword = async (req, res) => {
  try {
    const { email, password, repetirPassword } = req.body;

    const resultado = await recuperarPasswordService(
      email,
      password,
      repetirPassword,
    );

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensaje: error.message,
    });
  }
};

module.exports = { registro, recuperarPassword };
