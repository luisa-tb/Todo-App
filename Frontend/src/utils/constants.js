export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MAX_INTENTOS_LOGIN = 5;

export const ROUTES = {
  LOGIN: "/login",
  REGISTRO: "/registro",
  RECUPERAR: "/recuperar-contrasena",
  TAREAS: "/tareas",
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTRO: "/api/auth/registro",
    LOGIN: "/api/auth/login",
  },
  TAREAS: {
    BASE: "/api/tareas",
    POR_ID: (id) => `/api/tareas/${id}`,
    COMPLETADA: (id) => `/api/tareas/${id}/completada`,
  },
};

export const STORAGE_KEYS = {
  USUARIO: "todo_usuario",
};

export const TAREA_ESTADOS = {
  PENDIENTE: "pendiente",
  COMPLETADA: "completada",
  CANCELADA: "cancelada",
};
