const { validationResult } = require("express-validator");
const { loginService } = require("../service/login.service");

const login = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { email, password } = req.body;
    const resultado = await loginService(email, password);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
};

module.exports = { login };
