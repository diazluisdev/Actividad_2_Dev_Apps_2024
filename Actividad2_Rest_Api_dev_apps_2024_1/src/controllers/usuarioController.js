const Usuario = require("../models/Usuario");

// Iniciar sesión
const iniciarSesion = async (req, res) => {
  const { cedula, contrasena } = req.body;

  try {
    if (!cedula) {
      return res.status(400).json({
        code: 400,
        message: "La cédula es requerida para iniciar sesión",
      });
    }
    // Buscar al usuario en la base de datos por su cédula
    const usuario = await Usuario.findOne({ where: { cedula } });

    // Verificar si el usuario existe y la contraseña coincide
    if (usuario && usuario.contrasena === contrasena) {
      res.status(200).json({
        code: "200",
        message: "Inicio de sesión exitoso",
        primer_nombre: usuario.primer_nombre,
      });
    } else {
      res
        .status(401)
        .json({ code: "401", message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

// Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  const {
    cedula,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    genero,
    correo,
    contrasena,
    pregunta_contra,
    respuesta_contra,
    numero_tel,
    foto,
    rol,
    pais,
    ciudad,
  } = req.body;

  try {
    // Crear el nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      cedula,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      genero,
      correo,
      contrasena,
      pregunta_contra,
      respuesta_contra,
      numero_tel,
      foto,
      rol,
      pais,
      ciudad,
    });

    res
      .status(201)
      .json({ code: "201", message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

// Actualizar datos de un usuario
const actualizarUsuario = async (req, res) => {
  const { cedula } = req.params;
  const {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    contrasena,
    genero,
    correo,
    pregunta_contra,
    respuesta_contra,
    numero_tel,
    foto,
    rol,
    pais,
    ciudad,
  } = req.body;

  try {
    // Buscar el usuario por su cédula
    const usuario = await Usuario.findByPk(cedula);

    // Verificar si el usuario existe
    if (usuario) {
      // Actualizar los datos del usuario
      await usuario.update({
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        contrasena,
        genero,
        correo,
        pregunta_contra,
        respuesta_contra,
        numero_tel,
        foto,
        rol,
        pais,
        ciudad,
      });

      res
        .status(200)
        .json({ code: "200", message: "Usuario actualizado exitosamente" });
    } else {
      res.status(404).json({ code: "404", message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

const eliminarUsuarioPorCedula = async (req, res) => {
  const { cedula } = req.params;

  try {
    // Buscar el usuario por su cédula
    const usuario = await Usuario.findByPk(cedula);

    // Verificar si el usuario existe
    if (usuario) {
      // Eliminar el usuario de la base de datos
      await usuario.destroy();
      // contar usuarios existentes
      const remainingUsers = await Usuario.count();

      res.status(200).json({
        code: "200",
        message: "Usuario eliminado exitosamente",
        total: remainingUsers,
      });
    } else {
      // Si el usuario no se encuentra
      res.status(404).json({ code: "404", message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

// Buscar un usuario por su cédula
const buscarUsuarioPorCedula = async (req, res) => {
  const { cedula } = req.params; // Obtener la cédula de los parámetros de la ruta

  try {
    // Buscar al usuario en la base de datos por su cédula
    const usuario = await Usuario.findOne({ where: { cedula } });

    // Verificar si el usuario existe
    if (usuario) {
      // Enviar los datos del usuario en la respuesta
      res.status(200).json({
        code: "200",
        message: "El usuario ha sido encontrado",
        usuario: {
          cedula: usuario.cedula,
          primer_nombre: usuario.primer_nombre,
          primer_apellido: usuario.primer_apellido,
          correo: usuario.correo,
          pregunta_contra: usuario.pregunta_contra,
          respuesta_contra: usuario.respuesta_contra,
          numero_tel: usuario.numero_tel,
        },
      });
    } else {
      res.status(404).json({ code: "404", message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

const recuperarContrasena = async (req, res) => {
  const { cedula } = req.params; 

  try {
    // Buscar al usuario por su cédula
    const usuario = await Usuario.findOne({ where: { cedula } });

    // Verificar si el usuario existe
    if (!usuario) {
      return res
        .status(404)
        .json({ code: "404", message: "El usuario no existe" });
    }

    // Verificar si el usuario tiene una pregunta de recuperación asociada
    if (!usuario.pregunta_contra) {
      return res.status(400).json({
        code: "400",
        message: "El usuario no tiene una pregunta de recuperación asociada",
      });
    }

    // Enviar la pregunta de recuperación asociada al usuario
    res.status(200).json({
      code: "200",
      message: "Ingrese su respuesta a la pregunta de recuperación",
      pregunta: usuario.pregunta_contra,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

const validarRespuesta = async (req, res) => {
  const { respuesta } = req.body;
  const { cedula } = req.params; // Obtener la cedula de los parametros

  try {
    // Obtener la respuesta de recuperación almacenada en la base de datos
    const usuario = await Usuario.findOne({ where: { cedula } });

    // Verificar si la respuesta coincide con la respuesta de recuperación en la base de datos
    if (
      respuesta.trim().toLowerCase() !== usuario.respuesta_contra.trim().toLowerCase() // Utilizar directamente el objeto usuario recuperado
    ) {
      return res
        .status(400)
        .json({ code: "400", message: "La respuesta ingresada es incorrecta" });
    }

    // Si la respuesta es correcta, enviar el nombre de usuario y la contraseña asociada
    res.status(200).json({
      code: "200",
      message: `La respuesta ingresada es correcta. El nombre de usuario es: ${usuario.primer_nombre} y la contraseña es: ${usuario.contrasena}`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: "500", message: "Error interno del servidor" });
  }
};

module.exports = {
  iniciarSesion,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuarioPorCedula,
  buscarUsuarioPorCedula,
  recuperarContrasena,
  validarRespuesta,
};
