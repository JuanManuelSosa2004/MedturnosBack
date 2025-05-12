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
  console.log('Intentando iniciar sesión con:', { email, contrasena }); // Depuración

  obtenerUsuarioLogeo([email, contrasena], (err, usuario) => {
    if (err) {
      console.error('Error al verificar usuario:', err); // Depuración
      return res.status(500).json({ mensaje: 'Error al verificar usuario' });
    }

    if (!usuario) {
      console.log('Credenciales inválidas'); // Depuración
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    console.log('Usuario autenticado:', usuario); // Depuración

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
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
