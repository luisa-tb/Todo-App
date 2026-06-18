import { useContext } from "react";
import AuthContext from "./AuthContext";

export const useAuthSession = () => {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuthSession debe usarse dentro de AuthProvider");
  }
  return contexto;
};
