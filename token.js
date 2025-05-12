const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ mensaje: 'No se proporcionó token de autenticación' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }

    req.usuarioId = decoded.id;
    req.usuarioEmail = decoded.email;
    next();
  });
};

module.exports = verificarToken;
