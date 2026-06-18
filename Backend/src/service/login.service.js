const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/BD-config");
const { buscarUsuarioPorEmail } = require("../model/usuario.model");

const MAX_INTENTOS = 5;
const MINUTOS_BLOQUEO = 5;

const loginService = async (email, password) => {
  const usuario = await buscarUsuarioPorEmail(email);

  if (!usuario) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  if (
    usuario.bloqueado_hasta &&
    new Date() < new Date(usuario.bloqueado_hasta)
  ) {
    const error = new Error(
      "Cuenta bloqueada temporalmente. Intenta más tarde",
    );
    error.status = 403;
    throw error;
  }

  const passwordCorrecta = await bcrypt.compare(password, usuario.password);

  if (!passwordCorrecta) {
    const nuevosIntentos = usuario.intentos_fallidos + 1;

    if (nuevosIntentos >= MAX_INTENTOS) {
      const bloqueadoHasta = new Date(Date.now() + MINUTOS_BLOQUEO * 60 * 1000);
      await pool.execute(
        "UPDATE usuario SET intentos_fallidos = ?, bloqueado_hasta = ? WHERE id = ?",
        [nuevosIntentos, bloqueadoHasta, usuario.id],
      );
      const error = new Error(
        "Cuenta bloqueada por 5 minutos por múltiples intentos fallidos",
      );
      error.status = 403;
      throw error;
    }

    await pool.execute(
      "UPDATE usuario SET intentos_fallidos = ? WHERE id = ?",
      [nuevosIntentos, usuario.id],
    );

    const error = new Error(
      `Credenciales inválidas. Intentos fallidos: ${nuevosIntentos}/${MAX_INTENTOS}`,
    );
    error.status = 401;
    throw error;
  }

  await pool.execute(
    "UPDATE usuario SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE id = ?",
    [usuario.id],
  );

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );

  return {
    data: {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        token,
      },
    },
  };
};

module.exports = { loginService };
