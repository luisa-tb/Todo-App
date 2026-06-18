import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "./utils/constants";
import LoginPages from "./pages/loginPages";
import RegisterPages from "./pages/registerPages";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import TasksPage from "./pages/TasksPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to={ROUTES.LOGIN} replace /> },
  { path: ROUTES.LOGIN, element: <LoginPages /> },
  { path: ROUTES.REGISTRO, element: <RegisterPages /> },
  { path: ROUTES.RECUPERAR, element: <RecoverPasswordPage /> },
  { path: ROUTES.TAREAS, element: <TasksPage /> },
]);
