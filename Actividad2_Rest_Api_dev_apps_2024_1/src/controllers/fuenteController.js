const FuenteIngresos = require("../models/FuenteIngresos");
const Usuario = require("../models/Usuario");

// Obtener todas las fuentes de ingresos
const obtenerTodasFuentes = async (req, res) => {
  try {
    const fuentes = await FuenteIngresos.findAll();
    res.status(200).json({
      code: "200",
      message: "Fuentes de ingresos obtenidas correctamente",
      fuentes,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

// Obtener una fuente de ingresos por su ID
const obtenerFuentePorId = async (req, res) => {
  const { id_ingreso } = req.params;
  try {
    const fuente = await FuenteIngresos.findByPk(id_ingreso);

    if (fuente) {
      // Enviar los datos de la fuente en la respuesta
      res.status(200).json({
        code: "200",
        message: "Ingreso encontrado",
        fuente: {
          id_usuario: fuente.id_usuario,
          fecha_recepcion_fuente: fuente.fecha_recepcion_fuente,
          nombre_fuente: fuente.nombre_fuente,
          descripcion_fuente: fuente.descripcion_fuente,
          valor: fuente.valor,
        },
      });
    } else {
      res
        .status(404)
        .json({ code: "404", message: "Fuente de ingresos no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

// Crear una nueva fuente de ingresos
const crearFuente = async (req, res) => {
  const {
    id_usuario,
    fecha_recepcion_fuente,
    nombre_fuente,
    descripcion_fuente,
    valor,
  } = req.body;
  try {
    // Verificar si la cédula del usuario existe en la tabla de usuarios
    const usuarioExistente = await Usuario.findOne({
      where: { cedula: id_usuario },
    });

    if (!usuarioExistente) {
      return res.status(400).json({
        code: "400",
        message: "La cédula ingresada no se encuentra registrada",
      });
    }

    // Crear la nueva fuente de ingresos asociada al usuario existente
    const nuevaFuente = await FuenteIngresos.create({
      id_usuario,
      fecha_recepcion_fuente,
      nombre_fuente,
      descripcion_fuente,
      valor,
    });

    res.status(201).json({
      code: "201",
      message: "Fuente de ingresos creada exitosamente",
      fuente: nuevaFuente,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

// Actualizar una fuente de ingresos
const actualizarFuente = async (req, res) => {
  const { id_ingreso } = req.params;
  const {
    id_usuario,
    fecha_recepcion_fuente,
    nombre_fuente,
    descripcion_fuente,
    valor,
  } = req.body;
  try {
    const fuente = await FuenteIngresos.findByPk(id_ingreso);

    if (fuente) {
      // Verificar si el ingreso ya existe
      const ingresoExistente = await FuenteIngresos.findOne({
        where: { nombre_fuente }, 
      });

      if (ingresoExistente && ingresoExistente.id_ingreso !== id_ingreso) {
        // Si el ingreso ya existe y no es el mismo que se está actualizando
        return res.status(409).json({
          code: "409",
          message: "La fuente de ingresos ya existe",
        });
      }

      await fuente.update({
        id_usuario,
        fecha_recepcion_fuente,
        nombre_fuente,
        descripcion_fuente,
        valor,
      });

      res.status(200).json({
        code: "200",
        message: "Fuente de ingresos actualizada exitosamente",
        fuente: fuente,
      });
    } else {
      res
        .status(404)
        .json({ code: "404", message: "Fuente de ingresos no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

// Eliminar una fuente de ingresos
const eliminarFuente = async (req, res) => {
  const { id_ingreso } = req.params;
  try {
    const fuente = await FuenteIngresos.findByPk(id_ingreso);
    if (fuente) {
      await fuente.destroy();
      res.status(200).json({
        code: "200",
        message: "Fuente de ingresos eliminada exitosamente",
      });
    } else {
      res
        .status(404)
        .json({ code: "404", message: "Fuente de ingresos no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerTodasFuentes,
  obtenerFuentePorId,
  crearFuente,
  actualizarFuente,
  eliminarFuente,
};
