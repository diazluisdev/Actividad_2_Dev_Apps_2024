const Gastos = require('../models/Gastos');
const Usuario = require("../models/Usuario");

// Obtener todos los gastos
const getAllGastos = async (req, res) => {
  try {
    const gastos = await Gastos.findAll();
    res.json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener un gasto por su ID
const getGastoById = async (req, res) => {
  const { id } = req.params;
  try {
    const gasto = await Gastos.findByPk(id);
    if (gasto) {
      res.json(gasto);
    } else {
      res.status(404).send('Gasto no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Crear un nuevo gasto
const createGasto = async (req, res) => {
  const { id_usuario, fecha_gasto, nombre_gasto, valor_gasto, categoria_gasto, descripcion_gasto } = req.body;
  try {
    const nuevoGasto = await Gastos.create({
      id_usuario,
      fecha_gasto,
      nombre_gasto,
      valor_gasto,
      categoria_gasto,
      descripcion_gasto
    });

    res.status(201).json({
      message: 'Gasto creado exitosamente',
      gasto: nuevoGasto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Actualizar un gasto
const updateGasto = async (req, res) => {
  const { id } = req.params;
  const { id_usuario, fecha_gasto, nombre_gasto, valor_gasto, categoria_gasto, descripcion_gasto } = req.body;
  try {
    const gasto = await Gastos.findByPk(id);

    if (gasto) {
      await gasto.update({
        id_usuario,
        fecha_gasto,
        nombre_gasto,
        valor_gasto,
        categoria_gasto,
        descripcion_gasto
      });

      res.json({
        gasto: gasto,
        mensaje: "Gasto actualizado exitosamente",
      });
    } else {
      res.status(404).send('Gasto no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Eliminar un gasto
const deleteGasto = async (req, res) => {
  const { id } = req.params;
  try {
    const gasto = await Gastos.findByPk(id);
    if (gasto) {
      await gasto.destroy();
      res.send('Gasto eliminado exitosamente');
    } else {
      res.status(404).send('Gasto no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  getAllGastos,
  getGastoById,
  createGasto,
  updateGasto,
  deleteGasto,
};
