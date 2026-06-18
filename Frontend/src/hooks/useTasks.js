import { useCallback, useState } from "react";
import { validarTarea } from "../utils/validators.js";
import {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
  marcarTareaCompletada,
} from "../services/tasks.service.js";

export const useTasks = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarTareas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const lista = await obtenerTareas();
      // VALIDACIÓN ADICIONAL: Si por alguna razón no es array, asignamos un array vacío
      const arregloValido = Array.isArray(lista) ? lista : [];
      setTareas(arregloValido);
      return { exito: true, data: arregloValido };
    } catch (err) {
      setError(err.message);
      return { exito: false, mensaje: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const agregarTarea = async (datos) => {
    setError(null);
    const validacion = validarTarea(datos);
    if (!validacion.valido) {
      const mensaje = validacion.errores.join(". ");
      setError(mensaje);
      return { exito: false, mensaje };
    }

    setLoading(true);
    try {
      const resultado = await crearTarea({
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
        fecha_vencimiento: datos.fecha_vencimiento,
      });
      setTareas((prev) =>
        [...prev, resultado.tarea].sort(
          (a, b) =>
            new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento),
        ),
      );
      return { exito: true, data: resultado };
    } catch (err) {
      setError(err.message);
      return { exito: false, mensaje: err.message };
    } finally {
      setLoading(false);
    }
  };

  const editarTarea = async (id, datos) => {
    setError(null);
    const validacion = validarTarea(datos);
    if (!validacion.valido) {
      const mensaje = validacion.errores.join(". ");
      setError(mensaje);
      return { exito: false, mensaje };
    }

    setLoading(true);
    try {
      const resultado = await actualizarTarea(id, {
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
        fecha_vencimiento: datos.fecha_vencimiento,
      });
      setTareas((prev) =>
        prev
          .map((t) => (t.id === id ? resultado.tarea : t))
          .sort(
            (a, b) =>
              new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento),
          ),
      );
      return { exito: true, data: resultado };
    } catch (err) {
      setError(err.message);
      return { exito: false, mensaje: err.message };
    } finally {
      setLoading(false);
    }
  };

  const borrarTarea = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarTarea(id);
      setTareas((prev) => prev.filter((t) => t.id !== id));
      return { exito: true };
    } catch (err) {
      setError(err.message);
      return { exito: false, mensaje: err.message };
    } finally {
      setLoading(false);
    }
  };

  const completarTarea = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await marcarTareaCompletada(id);
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completada: true } : t)),
      );
      return { exito: true };
    } catch (err) {
      setError(err.message);
      return { exito: false, mensaje: err.message };
    } finally {
      setLoading(false);
    }
  };

  const limpiarError = () => setError(null);

  return {
    tareas,
    loading,
    error,
    cargarTareas,
    agregarTarea,
    editarTarea,
    borrarTarea,
    completarTarea,
    limpiarError,
  };
};
