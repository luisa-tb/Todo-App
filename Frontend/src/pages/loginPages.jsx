import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.js";
import { useAuthSession } from "../context/useAuthSession.js";
import { ROUTES } from "../utils/constants.js";
import EmailField from "../components/EmailField.jsx";
import PasswordField from "../components/PasswordField.jsx";
import "../styles/auth.css";

const LoginPages = () => {
  const navigate = useNavigate();
  const { guardarSesion } = useAuthSession();
  const { loading, error, login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await login({ email, password });

    if (resultado?.exito) {
      guardarSesion(resultado.data.usuario);
      navigate(ROUTES.TAREAS, { replace: true });
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>

        {/* ❌ Tenías: <form> className=... — las props van dentro de la etiqueta */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <EmailField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mostrarToggle
            mostrarPassword={mostrarPassword}
            onToggleMostrar={() => setMostrarPassword((prev) => !prev)}
          />

          {error && <p className="auth-message auth-message--error">{error}</p>}

          <button
            type="submit"
            className="auth-btn auth-btn--primary"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <footer className="auth-footer">
          <button
            type="button"
            className="auth-link"
            onClick={() => navigate(ROUTES.REGISTRO)}
          >
            Crear cuenta
          </button>
          <button
            type="button"
            className="auth-link"
            onClick={() => navigate(ROUTES.RECUPERAR)}
          >
            Recuperar contraseña
          </button>
        </footer>
      </div>
    </main>
  );
};

export default LoginPages;
