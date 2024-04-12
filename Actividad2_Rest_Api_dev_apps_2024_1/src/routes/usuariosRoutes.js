const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/login", usuarioController.iniciarSesion);

router.post("/registro", usuarioController.registrarUsuario);

router.put("/actualizar/:cedula", usuarioController.actualizarUsuario);

router.delete("/:cedula", usuarioController.eliminarUsuarioPorCedula);

router.get("/:cedula", usuarioController.buscarUsuarioPorCedula);

router.get("/recuperar/:cedula", usuarioController.recuperarContrasena);

router.post("/recuperar/validar/:cedula", usuarioController.validarRespuesta);
module.exports = router;
