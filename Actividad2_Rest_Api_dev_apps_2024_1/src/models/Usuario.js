const { DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

const Usuario = sequelize.define('Usuario', {
  cedula: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  tipo_identificacion: {
    type: DataTypes.STRING,
  },
  contrasena: {
    type: DataTypes.STRING,
  },
  pregunta_contra: {
    type: DataTypes.STRING,
  },
  respuesta_contra: {
    type: DataTypes.STRING,
  },
  primer_nombre: {
    type: DataTypes.STRING,
  },
  segundo_nombre: {
    type: DataTypes.STRING,
  },
  primer_apellido: {
    type: DataTypes.STRING,
  },
  segundo_apellido: {
    type: DataTypes.STRING,
  },
  genero: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  numero_tel: {
    type: DataTypes.STRING,
  },
  foto: {
    type: DataTypes.STRING,
  },
  rol: {
    type: DataTypes.STRING,
  },
  pais: {
    type: DataTypes.STRING,
  },
  ciudad: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'usuarios',
  timestamps: false, // Deshabilitar timestamps
});


module.exports = Usuario;

