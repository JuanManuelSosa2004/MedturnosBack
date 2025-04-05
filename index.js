const express = require('express');
const app = express();

const PORT=3000;

const usuarioRoutes = require('./routes/usuariosRoutes');


app.use(express.json());
app.use('/usuarios', usuarioRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});