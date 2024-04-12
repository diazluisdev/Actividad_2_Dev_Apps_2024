const CategoriaGastos = require('../models/CategoriaGastos');
const Usuario = require("../models/Usuario");

// Obtener todas las categorías de gastos
const getAllCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaGastos.findAll();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener una categoría de gastos por su ID
const getCategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await CategoriaGastos.findByPk(id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).send('Categoría de gastos no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Crear una nueva categoría de gastos
const createCategoria = async (req, res) => {
  const { id_usuario, fecha_categoria, nombre_categoria, descripcion_categoria, icono } = req.body;
  try {
    const nuevaCategoria = await CategoriaGastos.create({
      id_usuario,
      fecha_categoria,
      nombre_categoria,
      descripcion_categoria,
      icono
    });

    res.status(201).json({
      message: 'Categoría de gastos creada exitosamente',
      categoria: nuevaCategoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Actualizar una categoría de gastos
const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { id_usuario, fecha_categoria, nombre_categoria, descripcion_categoria, icono } = req.body;
  try {
    const categoria = await CategoriaGastos.findByPk(id);

    if (categoria) {
      await categoria.update({
        id_usuario,
        fecha_categoria,
        nombre_categoria,
        descripcion_categoria,
        icono
      });

      res.json({
        categoria: categoria,
        mensaje: "Categoría de gastos actualizada exitosamente",
      });
    } else {
      res.status(404).send('Categoría de gastos no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Eliminar una categoría de gastos
const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await CategoriaGastos.findByPk(id);
    if (categoria) {
      await categoria.destroy();
      res.send('Categoría de gastos eliminada exitosamente');
    } else {
      res.status(404).send('Categoría de gastos no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
