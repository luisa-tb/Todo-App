import { createContext, useState } from "react";
import {
  eliminarUsuarioGuardado,
  guardarUsuario,
  obtenerUsuarioGuardado,
} from "../utils/storage.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => obtenerUsuarioGuardado());

  const guardarSesion = (usuarioData) => {
    if (!usuarioData) return;

    const sesion = {
      id: usuarioData.id,
      nombre: usuarioData.nombre,
      apellido: usuarioData.apellido,
      email: usuarioData.email,
      token: usuarioData.token,
    };

    guardarUsuario(sesion);
    setUsuario(sesion);
  };

  const cerrarSesion = () => {
    eliminarUsuarioGuardado();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, guardarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
