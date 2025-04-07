const express = require('express');
const app = express();

app.use(express.json());
const PORT=3000;

const usuarioRoutes = require('./routes/usuariosRoutes');


app.use(express.json());
app.use('/usuarios', usuarioRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});