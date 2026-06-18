const API_URL = "http://localhost:3000/api/tareas";

const obtenerToken = () => {
  const sesionRaw = localStorage.getItem("todo_usuario");
  if (!sesionRaw) return null;

  try {
    const sesion = JSON.parse(sesionRaw);
    return sesion.token || null;
  } catch (error) {
    console.error("Error al leer el token del localStorage", error);
    return null;
  }
};

export const obtenerTareas = async () => {
  const token = obtenerToken();
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || "Error al obtener tareas");
  }

  const data = await response.json();
  // RETORNO CORREGIDO: Aseguramos devolver el arreglo directo para evitar el error del .map
  return data.tareas || [];
};

export const crearTarea = async (datosTarea) => {
  const token = obtenerToken();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datosTarea),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || "Error al crear tarea");
  }
  return await response.json();
};

export const actualizarTarea = async (id, datosTarea) => {
  const token = obtenerToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datosTarea),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || "Error al actualizar tarea");
  }
  return await response.json();
};

export const eliminarTarea = async (id) => {
  const token = obtenerToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || "Error al eliminar tarea");
  }
  return await response.json();
};

export const marcarTareaCompletada = async (id) => {
  const token = obtenerToken();
  const response = await fetch(`${API_URL}/${id}/completada`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || "Error al completar tarea");
  }
  return await response.json();
};
