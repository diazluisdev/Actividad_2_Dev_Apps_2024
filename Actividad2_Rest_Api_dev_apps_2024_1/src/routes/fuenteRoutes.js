const express = require("express");
const router = express.Router();
const fuenteController = require("../controllers/fuenteController");

router.get("/buscarTodo/", fuenteController.obtenerTodasFuentes);

router.get("/:id_ingreso", fuenteController.obtenerFuentePorId);

router.post("/", fuenteController.crearFuente);

router.put("/actualizar/:id_ingreso", fuenteController.actualizarFuente);

router.delete("/eliminar/:id_ingreso", fuenteController.eliminarFuente);

module.exports = router;
