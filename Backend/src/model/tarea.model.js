const pool = require("../config/BD-config");

const crearTarea = async (
  titulo,
  descripcion,
  fecha_vencimiento,
  usuario_id,
) => {
  const sql = `
    INSERT INTO tarea (titulo, descripcion, fecha_vencimiento, usuario_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [
    titulo,
    descripcion,
    fecha_vencimiento,
    usuario_id,
  ]);

  return {
    id: result.insertId,
    titulo,
    descripcion,
    fecha_vencimiento,
    usuario_id,
    completada: false,
  };
};

const obtenerTareasPorUsuario = async (usuario_id) => {
  const sql = `
    SELECT 
      id, 
      titulo, 
      descripcion, 
      fecha_vencimiento, 
      (estado = 'completada') AS completada,
      fecha_creacion AS created_at
    FROM tarea
    WHERE usuario_id = ?
    ORDER BY fecha_vencimiento ASC
  `;

  const [rows] = await pool.execute(sql, [usuario_id]);
  return rows;
};

const actualizarTarea = async (
  id,
  titulo,
  descripcion,
  fecha_vencimiento,
  usuario_id,
) => {
  const sql = `
    UPDATE tarea
    SET titulo = ?, descripcion = ?, fecha_vencimiento = ?
    WHERE id = ? AND usuario_id = ?
  `;

  const [result] = await pool.execute(sql, [
    titulo,
    descripcion,
    fecha_vencimiento,
    id,
    usuario_id,
  ]);

  return result.affectedRows > 0;
};

const eliminarTarea = async (id, usuario_id) => {
  const sql = `
    DELETE FROM tarea
    WHERE id = ? AND usuario_id = ?
  `;

  const [result] = await pool.execute(sql, [id, usuario_id]);

  return result.affectedRows > 0;
};

const marcarCompletada = async (id, usuario_id) => {
  const sql = `
    UPDATE tarea
    SET estado = 'completada' -- Usamos tu columna ENUM
    WHERE id = ? AND usuario_id = ?
  `;

  const [result] = await pool.execute(sql, [id, usuario_id]);
  return result.affectedRows > 0;
};

module.exports = {
  crearTarea,
  obtenerTareasPorUsuario,
  actualizarTarea,
  eliminarTarea,
  marcarCompletada,
};
