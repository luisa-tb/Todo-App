import { obtenerToken } from "./storage.js";

export const parsearRespuesta = async (respuesta) => {
  const cuerpo = await respuesta.json();
  if (!respuesta.ok) {
    const error = new Error(cuerpo.mensaje || "Error en la solicitud");
    error.status = respuesta.status;
    throw error;
  }
  return cuerpo;
};

export const headersAuth = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${obtenerToken()}`,
});
