const {
  crearUsuario,
  buscarUsuarioPorEmail,
  actualizarPassword,
} = require("../model/usuario.model");

const registroService = async (nombre, apellido, email, password) => {
  const usuarioExiste = await buscarUsuarioPorEmail(email);

  if (usuarioExiste) {
    const error = new Error("El email ya está registrado");
    error.status = 409;
    throw error;
  }

  const nuevoUsuario = await crearUsuario(nombre, apellido, email, password);
  return nuevoUsuario;
};

const recuperarPasswordService = async (email, password, repetirPassword) => {
  const usuario = await buscarUsuarioPorEmail(email);

  if (!usuario) {
    const error = new Error("El correo no está registrado");
    error.status = 404;
    throw error;
  }

  if (password !== repetirPassword) {
    const error = new Error("Las contraseñas no coinciden");
    error.status = 400;
    throw error;
  }

  await actualizarPassword(email, password);

  return {
    mensaje: "Contraseña actualizada correctamente",
  };
};

module.exports = { registroService, recuperarPasswordService };
