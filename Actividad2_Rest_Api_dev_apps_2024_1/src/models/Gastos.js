const { DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');
const Usuario = require('./Usuario');

const Gastos = sequelize.define('Gastos', {
  id_gastos: {
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
  fecha_gasto: {
    type: DataTypes.DATE,
  },
  nombre_gasto: {
    type: DataTypes.STRING,
  },
  valor_gasto: {
    type: DataTypes.DOUBLE,
  },
  categoria_gasto: {
    type: DataTypes.STRING,
  },
  descripcion_gasto: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'gastos',
  timestamps: false, // Deshabilitar timestamps
});


module.exports = Gastos;

