const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

//const { swaggerUi, swaggerDocs } = require('./config/swagger');
app.use(express.json());
const PORT = 3000;

//const turnosRoutes = require('./routes/turnosRoutes');

// Rutas de Swagger
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
app.use('/auth', require('./routes/authRoutes'));
app.use('/usuarios', require('./routes/usersRoutes'));
app.use('/medicos', require('./routes/medicosRoutes'));
app.use('/turnos', require('./routes/turnosRoutes'));
app.use('/Historial-Medico', require('./routes/historialMedicoRoutes'));
app.use('/uploads', require('./routes/uploads'));
app.use('/notificaciones', require('./routes/notificacionesRoutes'));
app.use('/notificaciones', require('./routes/notificacionesRoutes'));

// Inicializar sistema de notificaciones
const notificaciones = require('./controllers/Notificaciones/notif');

app.listen(PORT, () => {
  //  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  console.log('📧 Sistema de notificaciones de turnos inicializado automáticamente');
});
