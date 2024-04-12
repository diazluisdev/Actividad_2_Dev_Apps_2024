const Usuario = require('./Usuario');
const Gastos = require('./Gastos');
const CategoriaGastos = require('./CategoriaGastos');
const FuenteIngresos = require('./FuenteIngresos');


Usuario.hasMany(Gastos, { foreignKey: 'id_usuario' });
Usuario.hasMany(CategoriaGastos, { foreignKey: 'id_usuario' });
Usuario.hasMany(FuenteIngresos, { foreignKey: 'id_usuario' });
Gastos.belongsTo(Usuario, { foreignKey: 'id_usuario' });
CategoriaGastos.belongsTo(Usuario, { foreignKey: 'id_usuario' });
FuenteIngresos.belongsTo(Usuario,{ foreignKey: 'id_usuario' })

module.exports = {
  Usuario,
  Gastos,
  CategoriaGastos,
  FuenteIngresos

};
