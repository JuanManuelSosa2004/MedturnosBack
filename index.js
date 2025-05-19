const express = require('express');
const app = express();
const dotenv=require('dotenv').config();
const cookieParser = require('cookie-parser');

//const { swaggerUi, swaggerDocs } = require('./config/swagger');
app.use(cookieParser()); 
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
//app.use('/Historial-Medico', require('./routes/historialMedicos'));
app.use('/uploads', require('./routes/uploads'));

app.listen(PORT, () => {
  //  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});