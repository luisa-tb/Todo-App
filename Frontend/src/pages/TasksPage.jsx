import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthSession } from "../context/useAuthSession";
import { useTasks } from "../hooks/useTasks";
import { obtenerMinimoDatetimeLocal } from "../utils/dateUtils";
import { ROUTES } from "../utils/constants";
import "./taskpages.css";

const ICONOS = ["📋", "✅", "⚡", "🎯", "📌", "🔧", "📊", "🚀"];

const FORM_VACIO = { titulo: "", descripcion: "", fecha_vencimiento: "" };

const TasksPage = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAuthSession();
  const {
    tareas,
    loading,
    error,
    cargarTareas,
    agregarTarea,
    editarTarea,
    borrarTarea,
    completarTarea,
    limpiarError,
  } = useTasks();

  const [form, setForm] = useState(FORM_VACIO);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [confirmarId, setConfirmarId] = useState(null);

  useEffect(() => {
    if (!usuario) {
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }
    cargarTareas();
  }, [usuario]);

  const handleChange = (e) => {
    limpiarError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (modoEdicion) {
      const res = await editarTarea(modoEdicion, form);
      if (res.exito) cancelarEdicion();
    } else {
      const res = await agregarTarea(form);
      if (res.exito) setForm(FORM_VACIO);
    }
  };

  const iniciarEdicion = (tarea) => {
    setModoEdicion(tarea.id);
    setForm({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fecha_vencimiento: tarea.fecha_vencimiento?.slice(0, 16) ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setModoEdicion(null);
    setForm(FORM_VACIO);
    limpiarError();
  };

  const handleConfirmarEliminar = async () => {
    if (!confirmarId) return;
    await borrarTarea(confirmarId);
    setConfirmarId(null);
  };

  const handleLogout = () => {
    cerrarSesion();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const iconoPorIndice = (idx) => ICONOS[idx % ICONOS.length];

  return (
    <div className="tasks-page">
      <div className="tasks-inner">
        {/* Header */}
        <header className="tasks-header">
          <h1 className="tasks-welcome">
            Bienvenido, <strong>{usuario?.nombre ?? "Usuario"}</strong>
          </h1>
          <button className="tasks-logout-btn" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polyline
                points="16 17 21 12 16 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Cerrar sesión
          </button>
        </header>

        {/* Formulario */}
        <section className="tasks-form-section">
          <div className="tasks-form-field">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              name="titulo"
              className="tasks-form-input"
              placeholder="Escribe el título de la tarea"
              value={form.titulo}
              onChange={handleChange}
              maxLength={100}
            />
          </div>

          <div className="tasks-form-field">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="tasks-form-textarea"
              placeholder="Escribe una descripción detallada de la tarea..."
              value={form.descripcion}
              onChange={handleChange}
              maxLength={400}
            />
          </div>

          <div className="tasks-form-field tasks-datetime-wrap">
            <label htmlFor="fecha_vencimiento">Fecha y hora</label>
            <input
              id="fecha_vencimiento"
              name="fecha_vencimiento"
              type="datetime-local"
              className="tasks-form-input"
              value={form.fecha_vencimiento}
              onChange={handleChange}
              min={obtenerMinimoDatetimeLocal()}
            />
          </div>

          <div className="tasks-form-actions">
            <button
              className="tasks-btn tasks-btn--primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {modoEdicion ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {loading ? "Guardando..." : "Guardar"}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <line
                      x1="12"
                      y1="5"
                      x2="12"
                      y2="19"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {loading ? "Agregando..." : "Agregar tarea"}
                </>
              )}
            </button>
            <button
              className="tasks-btn tasks-btn--secondary"
              onClick={cancelarEdicion}
              disabled={loading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M23 4v6h-6M1 20v-6h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Limpiar
            </button>
          </div>

          {error && <p className="tasks-form-error">{error}</p>}
        </section>

        {/* ── CONTENEDOR DE SCROLL AGREGADO ── */}
        <div className="tasks-scroll-container">
          <div className="tasks-grid">
            {tareas.length === 0 && !loading && (
              <p className="tasks-empty">
                No tienes tareas aún. ¡Crea tu primera tarea!
              </p>
            )}
            {tareas.map((tarea, idx) => {
              const fecha = new Date(tarea.fecha_vencimiento);
              const fechaStr = fecha.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
              const horaStr = fecha.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={tarea.id}
                  className={`task-card${tarea.completada ? " task-card--completada" : ""}`}
                >
                  <div className="task-card__header">
                    <div className="task-card__icon">{iconoPorIndice(idx)}</div>
                    <h3 className="task-card__title">{tarea.titulo}</h3>
                  </div>

                  <p className="task-card__desc">{tarea.descripcion}</p>

                  <div className="task-card__meta">
                    <span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <line
                          x1="3"
                          y1="9"
                          x2="21"
                          y2="9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <line
                          x1="16"
                          y1="2"
                          x2="16"
                          y2="6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                      {fechaStr}
                    </span>
                    <span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <polyline
                          points="12 7 12 12 15 15"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                      {horaStr}
                    </span>
                  </div>

                  <div className="task-card__actions">
                    {!tarea.completada && (
                      <button
                        className="task-card__btn task-card__btn--complete"
                        onClick={() => completarTarea(tarea.id)}
                        disabled={loading}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <polyline
                            points="20 6 9 17 4 12"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Completar
                      </button>
                    )}
                    {!tarea.completada && (
                      <button
                        className="task-card__btn task-card__btn--edit"
                        onClick={() => iniciarEdicion(tarea)}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Editar
                      </button>
                    )}
                    <button
                      className="task-card__btn task-card__btn--delete"
                      onClick={() => setConfirmarId(tarea.id)}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <polyline
                          points="3 6 5 6 21 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M19 6l-1 14H6L5 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 11v6M14 11v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9 6V4h6v2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ── FIN DEL CONTENEDOR DE SCROLL ── */}
      </div>

      {/* Modal confirmar eliminar */}
      {confirmarId && (
        <div className="tasks-overlay" onClick={() => setConfirmarId(null)}>
          <div className="tasks-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tasks-modal__icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <polyline
                  points="3 6 5 6 21 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19 6l-1 14H6L5 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10 11v6M14 11v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M9 6V4h6v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="tasks-modal__title">¿Desea eliminar?</p>
            <div className="tasks-modal__actions">
              <button
                className="tasks-modal__btn tasks-modal__btn--confirm"
                onClick={handleConfirmarEliminar}
              >
                Sí
              </button>
              <button
                className="tasks-modal__btn tasks-modal__btn--cancel"
                onClick={() => setConfirmarId(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
