const { validationResult } = require("express-validator");
const {
  crearTareaService,
  obtenerTareasService,
  actualizarTareaService,
  eliminarTareaService,
  marcarCompletadaService,
} = require("../service/tarea.service");

const crearTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { titulo, descripcion, fecha_vencimiento } = req.body;
    const usuario_id = req.usuario.id;
    const tarea = await crearTareaService(
      titulo,
      descripcion,
      fecha_vencimiento,
      usuario_id,
    );
    return res
      .status(201)
      .json({ mensaje: "Tarea creada correctamente", tarea });
  } catch (error) {
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
};

const obtenerTareas = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const tareas = await obtenerTareasService(usuario_id);
    return res.status(200).json({ tareas });
  } catch (error) {
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
};

const actualizarTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha_vencimiento } = req.body;
    const usuario_id = req.usuario.id;
    const tarea = await actualizarTareaService(
      id,
      titulo,
      descripcion,
      fecha_vencimiento,
      usuario_id,
    );
    return res
      .status(200)
      .json({ mensaje: "Tarea actualizada correctamente", tarea });
  } catch (error) {
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id;
    const resultado = await eliminarTareaService(id, usuario_id);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
};

const marcarCompletada = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id;
    const resultado = await marcarCompletadaService(id, usuario_id);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
};

module.exports = {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
  marcarCompletada,
};
