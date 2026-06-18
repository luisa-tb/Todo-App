const EmailField = ({ id = 'email', value, onChange }) => {
  return (
    <div className="auth-field">
      <label htmlFor={id}>Email</label>
      <div className="auth-input-wrap auth-input-wrap--email">
        <input
          id={id}
          name="email"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Email"
          autoComplete="email"
        />
        <span className="auth-icon auth-icon--right" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16v12H4V6zm8 5.5L6.5 8h11L12 11.5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <rect
              x="4"
              y="6"
              width="16"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default EmailField;
