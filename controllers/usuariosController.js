const { obtenerUsuarioLogeo } = require('../models/usuariosModel');

const login = (req, res) => {
  const { email, contrasena } = req.body;

  //Agregar encriptacion a posteriori
  obtenerUsuarioLogeo([email, contrasena], (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error al verificar usuario' });

    if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      } else {
        return res.status(200).json({ mensaje: 'Inicio de sesión exitoso',usuario});
      }
    });
};

module.exports={login};
