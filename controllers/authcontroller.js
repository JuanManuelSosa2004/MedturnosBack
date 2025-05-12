const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Si decides usar bcrypt para encriptar contraseñas
const {
  obtenerUsuarioLogeo,
  buscarUsuarioPorEmail,
  registrarUsuario,
} = require('../models/authModel');

const SECRET_KEY = process.env.JWT_SECRET; // Usamos la clave secreta desde las variables de entorno

// Login
const login = (req, res) => {
  const { email, contrasena } = req.body;

  // Verifica las credenciales del usuario
  obtenerUsuarioLogeo([email, contrasena], (err, usuario) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al verificar usuario' });
    }

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Aquí podrías usar bcrypt para comparar contraseñas en lugar de texto claro
    // bcrypt.compare(contrasena, usuario.contrasena, (err, result) => {
    //   if (!result) return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    // });

    // Genera el JWT
    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email },
      SECRET_KEY,
      { expiresIn: '1h' } // El token expira en 1 hora
    );
    console.log;('Token generado:', token.id); // Depuración
    // Almacena el token en una cookie
    res.cookie('token', token, {
      httpOnly: true, // Evita que el token sea accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      maxAge: 3600000, // 1 hora en milisegundos
    });

    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
    });
  });
};

// Registro
const registro = (req, res) => {
  const { nombre, apellido, email, contrasena } = req.body;

  // Verifica si el email ya está registrado
  buscarUsuarioPorEmail(email, (err, usuarioExistente) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ mensaje: 'Error interno al verificar el usuario' });
    }

    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

    // Si no existe, registrar al usuario
    registrarUsuario([nombre, apellido, email, contrasena], (err, resultado) => {
      if (err) {
        console.error('Error al registrar usuario:', err);
        return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });
      }

      // Aquí podrías generar un token también si lo deseas, pero no es necesario
      res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    });
  });
};

module.exports = { login, registro };
