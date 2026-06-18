import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { ROUTES } from '../utils/constants.js';
import EmailField from '../components/EmailField.jsx';
import PasswordField from '../components/PasswordField.jsx';
import '../styles/auth.css';

const RegisterPages = () => {
  const navigate = useNavigate();
  const { loading, error, registrar } = useAuth();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [exito, setExito] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExito('');

    const resultado = await registrar({
      nombre,
      apellido,
      email,
      password,
    });

    if (resultado.exito) {
      setExito(resultado.data.mensaje || 'Cuenta creada exitosamente');
      setTimeout(() => navigate(ROUTES.LOGIN), 1500);
    }
  };

  const handleCancelar = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <main className="auth-page">
      <div className="auth-card auth-card--register">
        <h1 className="auth-title">Crear Cuenta</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="nombre">Nombre</label>
              <div className="auth-input-wrap">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                  autoComplete="given-name"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="apellido">Apellido</label>
              <div className="auth-input-wrap">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Apellido"
                  autoComplete="family-name"
                />
              </div>
            </div>
          </div>

          <EmailField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-message auth-message--error">{error}</p>}
          {exito && <p className="auth-message auth-message--success">{exito}</p>}

          <div className="auth-actions">
            <button
              type="submit"
              className="auth-btn auth-btn--primary"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Crear cuenta'}
            </button>
            <button
              type="button"
              className="auth-btn auth-btn--secondary"
              onClick={handleCancelar}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>

        <footer className="auth-footer">
          <Link className="auth-link" to={ROUTES.LOGIN}>
            Ya tengo cuenta
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default RegisterPages;
