const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/registrar-usuario", usuarioController.registrarPrimeiroUsuario);
router.post("/login", usuarioController.loginUsuario);
router.get("/validar-token", authMiddleware, usuarioController.validarToken);

module.exports = router;
