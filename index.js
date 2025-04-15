const express = require('express');
const app = express();
const { swaggerUi, swaggerDocs } = require('./config/swagger');

app.use(express.json());
const PORT = 3000;

const usuarioRoutes = require('./routes/usuariosRoutes');
//const turnosRoutes = require('./routes/turnosRoutes');
const medicosRoutes = require('./routes/medicosRoutes');

// Rutas de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
app.use('/usuarios', usuarioRoutes);
app.use('/medicos', medicosRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});