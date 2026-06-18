import { useState } from 'react';
import { validarCrearCuenta } from '../utils/validators.js';
import { registrarUsuario } from '../services/auth.service.js';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registrar = async (datos) => {
    setError(null);

    const validacion = validarCrearCuenta(datos);

    if (!validacion.valido) {
      const mensaje = validacion.errores.join('. ');
      setError(mensaje);
      return { exito: false, mensaje };
    }

    setLoading(true);

    try {
      const resultado = await registrarUsuario(datos);
      return { exito: true, data: resultado };
    } catch (err) {
      setError(err.message);
      return { exito: false, mensaje: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    registrar,
  };
};
