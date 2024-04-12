const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('appkodular', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Desactiva el registro de las consultas SQL
  define: {
    timestamps: false, // Evita que Sequelize añada campos createdAt y updatedAt automáticamente
  },
});

// Autenticación y conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;

