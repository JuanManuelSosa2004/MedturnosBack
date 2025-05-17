const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey'; // Asegúrate de definir JWT_SECRET en tu entorno

const verificarToken = (req, res, next) => {
  // Obtener el token desde las cookies
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ mensaje: 'No se proporcionó token de autenticación' });
  }

  // Verificar el token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err);
      return res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }

    console.log('Token decodificado:', decoded); // Depuración
    // Agregar información del usuario al objeto `req.user`
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next(); // Continuar con la siguiente función
  });
};

module.exports = verificarToken;