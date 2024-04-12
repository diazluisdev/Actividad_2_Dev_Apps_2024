const { DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');
const Usuario = require('./Usuario');

const CategoriaGastos = sequelize.define('CategoriaGastos', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.STRING,
    references: {
      model: Usuario,
      key: 'cedula',
    },
  },
  fecha_categoria: {
    type: DataTypes.DATE,
  },
  nombre_categoria: {
    type: DataTypes.STRING,
  },
  descripcion_categoria: {
    type: DataTypes.STRING,
  },
  icono: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'categoria_gastos',
  timestamps: false, // Deshabilitar timestamps
});

module.exports = CategoriaGastos;
