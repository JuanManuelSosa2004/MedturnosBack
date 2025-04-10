const express = require('express');
const app = express();

app.use(express.json());
const PORT=3000;

const usuarioRoutes = require('./routes/usuariosRoutes');
//const turnosRoutes = require('./routes/turnosRoutes');
const medicosRoutes = require('./routes/medicosRoutes');


app.use(express.json());
app.use('/usuarios', usuarioRoutes); 
//app.use('/turnos', turnosRoutes);
app.use('/medicos', medicosRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});