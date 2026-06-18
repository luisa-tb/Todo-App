import { useState } from "react";
import { validarLogin } from "../utils/validators.js";
import { iniciarSesion } from "../services/auth.service.js";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (datos) => {
    setError(null);

    const validacion = validarLogin(datos);

    if (!validacion.valido) {
      const mensaje = validacion.errores.join(". ");
      setError(mensaje);
      return { exito: false, mensaje };
    }

    setLoading(true);

    try {
      const resultado = await iniciarSesion(datos);
      return { exito: true, data: resultado.data };
    } catch (err) {
      setError(err.message);
      return { exito: false, mensaje: err.message, status: err.status };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
