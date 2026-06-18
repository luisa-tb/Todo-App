const pool = require("../config/BD-config");
const bcrypt = require("bcrypt");

const crearUsuario = async (nombre, apellido, email, password) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const sql = `
    INSERT INTO usuario(nombre, apellido, email, password)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [
    nombre,
    apellido,
    email,
    passwordHash,
  ]);

  return {
    id: result.insertId,
    nombre,
    apellido,
    email,
  };
};

const buscarUsuarioPorEmail = async (email) => {
  const sql = `
    SELECT id, nombre, apellido, email, password,
           intentos_fallidos, bloqueado_hasta
    FROM usuario
    WHERE email = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [email]);

  if (rows.length === 0) return null;

  return rows[0];
};

const actualizarPassword = async (email, password) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const sql = `
    UPDATE usuario
    SET password = ?
    WHERE email = ?
  `;

  const [result] = await pool.execute(sql, [passwordHash, email]);

  return result.affectedRows;
};

module.exports = {
  crearUsuario,
  buscarUsuarioPorEmail,
  actualizarPassword,
};
