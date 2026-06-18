import { useState } from "react";
import { Link } from "react-router-dom";
import { recuperarPasswordService } from "../services/auth.service.js";
import { ROUTES } from "../utils/constants.js";
import EmailField from "../components/EmailField.jsx";
import PasswordField from "../components/PasswordField.jsx";
import "../styles/auth.css";

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    try {
      const respuesta = await recuperarPasswordService({
        email,
        password,
        repetirPassword,
      });

      setMensaje(respuesta.mensaje || "Contraseña actualizada correctamente");

      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (err) {
      setError(err.message || "Error al recuperar la contraseña");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Recuperar Contraseña</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <EmailField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordField
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />

          {error && <p className="auth-message auth-message--error">{error}</p>}

          {mensaje && (
            <p className="auth-message auth-message--success">{mensaje}</p>
          )}

          <button type="submit" className="auth-btn auth-btn--primary">
            Recuperar contraseña
          </button>
        </form>

        <footer className="auth-footer">
          <Link className="auth-link" to={ROUTES.LOGIN}>
            Volver al login
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default RecoverPasswordPage;
