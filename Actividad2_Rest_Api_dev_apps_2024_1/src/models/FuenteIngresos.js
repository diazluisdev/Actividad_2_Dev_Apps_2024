const { DataTypes } = require("sequelize");
const sequelize = require("../libs/sequelize");
const Usuario = require("./Usuario");

const FuenteIngresos = sequelize.define(
  "FuenteIngresos",
  {
    id_ingreso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.STRING,
      references: {
        model: Usuario,
        key: "cedula",
      },
    },
    fecha_recepcion_fuente: {
      type: DataTypes.DATE,
    },
    nombre_fuente: {
      type: DataTypes.STRING,
      unique: true,
    },
    descripcion_fuente: {
      type: DataTypes.STRING,
    },
    valor: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    tableName: "fuente_ingresos",
    timestamps: false, // Deshabilitar timestamps
  }
);

module.exports = FuenteIngresos;
