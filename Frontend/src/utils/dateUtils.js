export const formatearFechaTarea = (fecha) => {
  return new Date(fecha).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const obtenerMinimoDatetimeLocal = () => {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');

  return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
};
