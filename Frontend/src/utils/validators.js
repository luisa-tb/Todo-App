const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const validarCrearCuenta = (datos) => {
  const errores = [];
  const { nombre, apellido, email, password } = datos ?? {};

  const faltaNombre = !nombre || !String(nombre).trim();
  const faltaApellido = !apellido || !String(apellido).trim();
  const faltaEmail = !email || !String(email).trim();
  const faltaPassword = !password || !String(password).trim();

  if (faltaNombre || faltaApellido || faltaEmail || faltaPassword) {
    errores.push('Todos los campos son obligatorios');
  } else {
    if (!EMAIL_REGEX.test(String(email).trim())) {
      errores.push('El formato del email no es válido');
    }

    if (!PASSWORD_REGEX.test(password)) {
      errores.push(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial'
      );
    }
  }

  return {
    valido: errores.length === 0,
    errores,
  };
};

export const validarLogin = (datos) => {
  const errores = [];
  const { email, password } = datos ?? {};

  const faltaEmail = !email || !String(email).trim();
  const faltaPassword = !password || !String(password).trim();

  if (faltaEmail || faltaPassword) {
    errores.push('El email y la contraseña son obligatorios');
  } else if (!EMAIL_REGEX.test(String(email).trim())) {
    errores.push('El formato del email no es válido');
  }

  return {
    valido: errores.length === 0,
    errores,
  };
};

export const validarTarea = (datos) => {
  const errores = [];
  const { titulo, descripcion, fecha_vencimiento } = datos ?? {};

  const faltaTitulo = !titulo || !String(titulo).trim();
  const faltaDescripcion = !descripcion || !String(descripcion).trim();
  const faltaFecha = !fecha_vencimiento || !String(fecha_vencimiento).trim();

  if (faltaTitulo || faltaDescripcion || faltaFecha) {
    errores.push('Todos los campos son obligatorios');
    return { valido: false, errores };
  }

  const fecha = new Date(fecha_vencimiento);

  if (Number.isNaN(fecha.getTime())) {
    errores.push('fecha no coincide');
    return { valido: false, errores };
  }

  const ahora = new Date();
  const inicioHoy = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate()
  );
  const inicioFecha = new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate()
  );

  if (inicioFecha < inicioHoy) {
    errores.push('fecha no coincide');
  } else if (inicioFecha.getTime() === inicioHoy.getTime() && fecha <= ahora) {
    errores.push('hora no valida');
  }

  return {
    valido: errores.length === 0,
    errores,
  };
};
