const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/registrar-usuario", usuarioController.registrarPrimeiroUsuario);
router.post("/login", usuarioController.loginUsuario);
router.get("/validar-token", usuarioController.validarToken);

module.exports = router;
