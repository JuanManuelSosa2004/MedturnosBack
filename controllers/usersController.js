const { obtenerPerfil, updateUser, eliminarCuenta, obtenerDatosAfiliado } = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;


const getProfile = (req, res) => {
    const id_usuario = req.user.id; 
  console.log('Datos del usuario en req.user:', req.user);

  if (!id_usuario) {
    return res.status(400).json({ mensaje: 'No se pudo identificar al usuario' });
  }

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


const updateProfile = (req, res) => {
  const id_usuario = req.user.id;
  const userData = req.body;
  console.log('Datos para actualizar el perfil:', userData);

  updateUser(id_usuario, userData, (err, usuarioActualizado) => {
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


const getAfiliado = (req, res) => {
  const id_usuario = req.user.id; 

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

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  getAfiliado,
};