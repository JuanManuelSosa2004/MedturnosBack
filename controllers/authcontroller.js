const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {
  obtenerUsuarioLogeo,
  buscarUsuarioPorEmail,
  registrarUsuario,
  guardarResetToken,
  buscarUsuarioPorResetToken,
  cambiarContrasenaConToken,
} = require('../models/authModel');
const { enviarRecuperacion } = require('../emailService');
const SECRET_KEY = process.env.JWT_SECRET; 

// Login
const login = (req, res) => {
  const { email, contrasena } = req.body;

  buscarUsuarioPorEmail(email, (err, usuario) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al verificar usuario' });
    }

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Compara la contraseña encriptada
    bcrypt.compare(contrasena, usuario.contrasena, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      // Genera el JWT
      const token = jwt.sign(
        { id: usuario.id_usuario, email: usuario.email, nombre: usuario.nombre },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        mensaje: 'Inicio de sesión exitoso',
        token,
      });
    });
  });
};

const registro = (req, res) => {
  const { nombre, apellido, email, contrasena, nombre_obra, plan } = req.body;

  buscarUsuarioPorEmail(email, (err, usuarioExistente) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ mensaje: 'Error interno al verificar el usuario' });
    }

    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

    // Encripta la contraseña antes de guardar
    bcrypt.hash(contrasena, 10, (err, hash) => {
      if (err) {
        console.error('Error al encriptar contraseña:', err);
        return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });
      }

      registrarUsuario([nombre, apellido, email, hash, nombre_obra, plan], (err, resultado) => {
        if (err) {
          console.error('Error al registrar usuario:', err);
          return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });
        }

        console.log('Registro exitoso en controller:', resultado);
        return res.status(201).json({ mensaje: 'Usuario registrado con éxito', resultado });
      });
    });
  });
};

// Solicitar recuperación de contraseña
const solicitarRecuperacion = (req, res) => {
  const { email } = req.body;
  buscarUsuarioPorEmail(email, (err, usuario) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno' });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Generar token numérico de 8 dígitos
    const token = Math.floor(10000000 + Math.random() * 90000000).toString();

    guardarResetToken(email, token, err => {
      if (err) return res.status(500).json({ mensaje: 'Error al guardar token' });

      enviarRecuperacion(email, token, (err, info) => {
        if (err) {
          console.error('Error enviando email:', err);
          return res.status(500).json({ mensaje: 'No se pudo enviar el email' });
        }
        res.status(200).json({
          mensaje: 'Se ha enviado un código de recuperación a tu correo',
        });
      });
    });
  });
};

// Cambiar la contraseña usando el token
const resetearContrasena = (req, res) => {
  const { token, nuevaContrasena, confirmarContrasena } = req.body;
  if (nuevaContrasena !== confirmarContrasena) {
    return res.status(400).json({ mensaje: 'Las contraseñas no coinciden' });
  }
  buscarUsuarioPorResetToken(token, (err, usuario) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno' });
    if (!usuario) return res.status(400).json({ mensaje: 'Código inválido o expirado' });

    // Encripta la nueva contraseña antes de guardar
    bcrypt.hash(nuevaContrasena, 10, (err, hash) => {
      if (err) return res.status(500).json({ mensaje: 'Error al encriptar contraseña' });

      cambiarContrasenaConToken(token, hash, err => {
        if (err) return res.status(500).json({ mensaje: 'Error al cambiar la contraseña' });
        res.status(200).json({ mensaje: 'Contraseña cambiada con éxito' });
      });
    });
  });
};

const logout = (req, res) => {
  res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
};

module.exports = {
  login,
  registro,
  solicitarRecuperacion,
  resetearContrasena,
  logout,
};
