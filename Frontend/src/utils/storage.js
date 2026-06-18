import { STORAGE_KEYS } from "./constants.js";

export const obtenerUsuarioGuardado = () => {
  const guardado = localStorage.getItem(STORAGE_KEYS.USUARIO);
  if (!guardado) return null;
  try {
    return JSON.parse(guardado);
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USUARIO);
    return null;
  }
};

export const guardarUsuario = (usuario) => {
  localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(usuario));
};

export const eliminarUsuarioGuardado = () => {
  localStorage.removeItem(STORAGE_KEYS.USUARIO);
};

export const obtenerToken = () => {
  const usuario = obtenerUsuarioGuardado();
  return usuario?.token ?? null;
};
