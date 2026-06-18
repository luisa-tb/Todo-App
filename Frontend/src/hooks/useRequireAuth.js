import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '../context/AuthContext.jsx';
import { ROUTES } from '../utils/constants.js';

export const useRequireAuth = () => {
  const navigate = useNavigate();
  const { usuario, cargando } = useAuthSession();

  useEffect(() => {
    if (!cargando && !usuario) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [usuario, cargando, navigate]);

  return { usuario, cargando };
};
