const express = require('express');
const router = express.Router();
const gastosController = require('../controllers/gastosController');

// Rutas para gestionar los gastos
router.get('/', gastosController.getAllGastos);
router.get('/:id', gastosController.getGastoById);
router.post('/', gastosController.createGasto);
router.put('/:id', gastosController.updateGasto);
router.delete('/:id', gastosController.deleteGasto);

module.exports = router;
