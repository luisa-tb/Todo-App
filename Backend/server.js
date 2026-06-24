require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");

const {
  registro,
  recuperarPassword,
} = require("./src/controller/auth-controller");

const { login } = require("./src/controller/login-controller");

const {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
  marcarCompletada: marcarTareaCompletadaController,
} = require("./src/controller/tarea-controller");

const { verifyToken } = require("./src/middleware/auth.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://todo-app-sandy-psi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ estado: "ok" });
});

app.post("/api/auth/registro", registro);
app.post("/api/auth/login", login);

app.put("/api/auth/recuperar", recuperarPassword);

app.post("/api/tareas", verifyToken, crearTarea);

app.get("/api/tareas", verifyToken, obtenerTareas);

app.put("/api/tareas/:id", verifyToken, actualizarTarea);

app.delete("/api/tareas/:id", verifyToken, eliminarTarea);

app.patch(
  "/api/tareas/:id/completada",
  verifyToken,
  marcarTareaCompletadaController,
);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    mensaje: err.message || "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
