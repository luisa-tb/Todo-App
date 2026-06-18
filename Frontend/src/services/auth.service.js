import { API_BASE_URL, API_ENDPOINTS } from "../utils/constants.js";
import { parsearRespuesta } from "../utils/api.js";

export const registrarUsuario = async (datos) => {
  const respuesta = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTRO}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    },
  );

  return parsearRespuesta(respuesta);
};

export const iniciarSesion = async (datos) => {
  const respuesta = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return parsearRespuesta(respuesta);
};

export const recuperarPasswordService = async (datos) => {
  const respuesta = await fetch(`${API_BASE_URL}/api/auth/recuperar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return parsearRespuesta(respuesta);
};
