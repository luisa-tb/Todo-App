const PasswordField = ({
  id = 'password',
  value,
  onChange,
  mostrarToggle = false,
  mostrarPassword = false,
  onToggleMostrar,
}) => {
  const wrapClass = mostrarToggle
    ? 'auth-input-wrap auth-input-wrap--password'
    : 'auth-input-wrap auth-input-wrap--password auth-input-wrap--password-no-toggle';

  return (
    <div className="auth-field">
      <label htmlFor={id}>Contraseña</label>
      <div className={wrapClass}>
        <span className="auth-icon auth-icon--left" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 11V8a4 4 0 118 0v3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          id={id}
          name="password"
          type={mostrarPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder="Password"
          autoComplete={mostrarToggle ? 'current-password' : 'new-password'}
        />
        {mostrarToggle && (
          <button
            type="button"
            className="auth-icon-btn"
            onClick={onToggleMostrar}
            aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {mostrarPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
