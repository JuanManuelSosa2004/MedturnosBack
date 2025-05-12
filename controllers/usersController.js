const { obtenerPerfil, editarPerfil, eliminarCuenta, obtenerDatosAfiliado } = require('../models/usersModel'); // Aquí importamos los métodos de tu modelo de usuario.
const jwt = require('jsonwebtoken'); // Por si necesitas trabajar con el JWT en el controlador.

const JWT_SECRET = 'yourSecretKey'; // Asegúrate de que sea la misma clave secreta que usas para firmar el JWT.


// Controlador para obtener el perfil del usuario
const getProfile = (req, res) => {
  const id_usuario = req.user.id; // `req.user` estará disponible gracias al middleware JWT

  obtenerPerfil(id_usuario, (err, perfil) => {
    if (err) {
      console.error('Error al obtener el perfil:', err);
      return res.status(500).json({ mensaje: 'Error interno' });
    }

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado' });
    }

    res.status(200).json(perfil);
  });
};

// Controlador para actualizar el perfil del usuario
const updateProfile = (req, res) => {
  const id_usuario = req.user.id;
  const { nombre, apellido, email } = req.body;

  // Validamos los campos necesarios
  if (!nombre || !apellido || !email) {
    return res.status(400).json({ mensaje: 'Faltan campos necesarios' });
  }

  editarPerfil(id_usuario, { nombre, apellido, email }, (err, usuarioActualizado) => {
    if (err) {
      console.error('Error al actualizar el perfil:', err);
      return res.status(500).json({ mensaje: 'Error interno' });
    }

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuarioActualizado);
  });
};

// Controlador para eliminar la cuenta del usuario
const deleteAccount = (req, res) => {
  const id_usuario = req.user.id;

  eliminarCuenta(id_usuario, (err) => {
    if (err) {
      console.error('Error al eliminar la cuenta:', err);
      return res.status(500).json({ mensaje: 'Error interno' });
    }

    res.status(200).json({ mensaje: 'Cuenta eliminada con éxito' });
  });
};

// Controlador para obtener los datos del afiliado (obra social)
const getAfiliado = (req, res) => {
  const id_usuario = req.user.id; // Obtener ID del usuario autenticado

  obtenerDatosAfiliado(id_usuario, (err, datosAfiliado) => {
    if (err) {
      console.error('Error al obtener datos de afiliado:', err);
      return res.status(500).json({ mensaje: 'Error interno al obtener datos' });
    }

    if (!datosAfiliado) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de afiliado' });
    }

    res.status(200).json(datosAfiliado);
  });
};

// Controlador para obtener la información del usuario desde el token
const getUserFromToken = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener token del header de la solicitud

  if (!token) {
    return res.status(403).json({ mensaje: 'Acceso denegado, no se encontró el token' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token no válido' });
    }

    // El token es válido, puedes retornar información del usuario
    res.status(200).json(decoded);
  });
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  getAfiliado,
  getUserFromToken
};
