const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./libs/sequelize');
const usuarioRoutes = require('./routes/usuariosRoutes');
const gastosRoutes = require('./routes/gastosRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const fuenteRoutes = require('./routes/fuenteRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(express.json());

// Middleware para analizar cuerpos de solicitud en formato urlencode
app.use(bodyParser.urlencoded({ extended: true }));

// Establecer el encabezado Content-Type para todas las respuestas como JSON
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Bloque try-catch para manejar errores de sincronización
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
 
    // Sincronizar modelos después de la autenticación
    await sequelize.sync();
    console.log('Modelos sincronizados correctamente');

    // Inicia el servidor después de la sincronización
    app.listen(port, () => {
      console.log(`Servidor en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al sincronizar modelos o autenticar la base de datos:', error);
  }
})();

// Define las rutas para cada recurso
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/fuentes', fuenteRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Todo OK');
});




