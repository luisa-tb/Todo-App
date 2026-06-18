const {
  crearTarea,
  obtenerTareasPorUsuario,
  actualizarTarea,
  eliminarTarea,
  marcarCompletada,
} = require("../model/tarea.model");

const crearTareaService = async (
  titulo,
  descripcion,
  fecha_vencimiento,
  usuario_id,
) => {
  const tarea = await crearTarea(
    titulo,
    descripcion,
    fecha_vencimiento,
    usuario_id,
  );
  return tarea;
};

const obtenerTareasService = async (usuario_id) => {
  const tareas = await obtenerTareasPorUsuario(usuario_id);
  return tareas;
};

const actualizarTareaService = async (
  id,
  titulo,
  descripcion,
  fecha_vencimiento,
  usuario_id,
) => {
  const actualizada = await actualizarTarea(
    id,
    titulo,
    descripcion,
    fecha_vencimiento,
    usuario_id,
  );

  if (!actualizada) {
    const error = new Error(
      "Tarea no encontrada o no tienes permiso para editarla",
    );
    error.status = 404;
    throw error;
  }

  return { id, titulo, descripcion, fecha_vencimiento };
};

const eliminarTareaService = async (id, usuario_id) => {
  const eliminada = await eliminarTarea(id, usuario_id);

  if (!eliminada) {
    const error = new Error(
      "Tarea no encontrada o no tienes permiso para eliminarla",
    );
    error.status = 404;
    throw error;
  }

  return { mensaje: "Tarea eliminada correctamente" };
};

const marcarCompletadaService = async (id, usuario_id) => {
  const completada = await marcarCompletada(id, usuario_id);

  if (!completada) {
    const error = new Error("Tarea no encontrada o no tienes permiso");
    error.status = 404;
    throw error;
  }

  return { mensaje: "Tarea marcada como completada" };
};

module.exports = {
  crearTareaService,
  obtenerTareasService,
  actualizarTareaService,
  eliminarTareaService,
  marcarCompletadaService,
};
