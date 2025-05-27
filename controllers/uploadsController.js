const fs = require('fs');
const {
  guardarArchivoNota,
  obtenerImagenNota,
  obtenerPerfilUsuario,
  actualizarFotoPerfil,
  actualizarFotoProfesional,
} = require('../models/uploadsModel');

// Subir archivo
const uploadFiles = (req, res) => {
  // Verifica si se subió un archivo
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se proporcionó ningún archivo' });
  }

  // Obtén los datos del cuerpo de la solicitud
  const { id_turno, contenido } = req.body;

  guardarArchivoNota(id_turno, contenido, req.file.path, (err, result) => {
    // Elimina el archivo temporal después de guardarlo
    fs.unlinkSync(req.file.path);

    if (err) {
      console.error('Error al guardar el archivo en la base de datos:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    // Responde con éxito
    res.status(201).json({ mensaje: 'Archivo subido con éxito', id: result.insertId });
  });
};

// Recuperar imagen de nota médica
const obtenerImagen = (req, res) => {
  const { id_turno } = req.params;

  obtenerImagenNota(id_turno, (err, results) => {
    if (err) {
      console.error('Error al recuperar la imagen:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }

    let imagen = results[0].imagenes;
    // Si imagen es null o undefined, responde 404
    if (!imagen) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }
    // Si viene como { type: 'Buffer', data: [...] }, conviértelo a Buffer real
    if (!Buffer.isBuffer(imagen) && imagen?.data) {
      imagen = Buffer.from(imagen.data);
    }
    // Si sigue sin ser buffer, responde error
    if (!Buffer.isBuffer(imagen)) {
      console.error('La imagen no es un buffer:', imagen);
      return res.status(500).json({ mensaje: 'La imagen no es un buffer válido' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send({ base64: imagen.toString('base64') });
  });
};

// Recuperar foto de perfil usando el id del usuario autenticado (token)
const obtenerFotoPerfil = (req, res) => {
  // El id del usuario viene del token decodificado por el middleware de autenticación
  const id_usuario = req.user?.id || req.user?.id_usuario;

  if (!id_usuario) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  obtenerPerfilUsuario(id_usuario, (err, results) => {
    if (err) {
      console.error('Error al recuperar la foto de perfil:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0 || !results[0].perfil) {
      return res.status(404).json({ mensaje: 'Foto de perfil no encontrada' });
    }

    const imagen = results[0].perfil;
res.setHeader('Content-Type', 'application/json');
res.send({ base64: imagen.toString('base64') });

  });
};

// Subir foto de perfil usando el token
const subirFotoPerfil = (req, res) => {
    console.log('Archivo recibido en backend:', req.file); // <-- AGREGA ESTO

  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se proporcionó ningún archivo' });
  }

  const id_usuario = req.user?.id || req.user?.id_usuario;
  if (!id_usuario) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  actualizarFotoPerfil(id_usuario, req.file.path, (err, result) => {
    fs.unlinkSync(req.file.path); // Borra el archivo temporal
    if (err) {
      console.error('Error al actualizar la foto de perfil:', err);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la foto de perfil' });
    }
    res.status(200).json({ mensaje: 'Foto de perfil actualizada con éxito' });
  });
};

// Subir foto de profesional
const subirFotoProfesional = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se proporcionó ningún archivo' });
  }

  const { id_profesional } = req.body; // Obtener el ID del profesional desde el cuerpo de la solicitud
  if (!id_profesional) {
    return res.status(400).json({ mensaje: 'No se proporcionó el ID del profesional' });
  }

  actualizarFotoProfesional(id_profesional, req.file.path, (err, result) => {
    fs.unlinkSync(req.file.path); // Eliminar el archivo temporal
    if (err) {
      console.error('Error al actualizar la foto del profesional:', err);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la foto del profesional' });
    }
    res.status(200).json({ mensaje: 'Foto del profesional actualizada con éxito' });
  });
};

// Obtener foto de un profesional
const obtenerFotoProfesional = (req, res) => {
  const { id_profesional } = req.params; // Obtener el ID del profesional desde los parámetros de la URL

  if (!id_profesional) {
    return res.status(400).json({ mensaje: 'No se proporcionó el ID del profesional' });
  }

  obtenerFotoProfesional(id_profesional, (err, results) => {
    if (err) {
      console.error('Error al recuperar la foto del profesional:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0 || !results[0].imagen) {
      return res.status(404).json({ mensaje: 'Foto del profesional no encontrada' });
    }

    const imagen = results[0].imagen;

    // Configura el encabezado para enviar la imagen
    res.setHeader('Content-Type', 'image/jpeg'); // Cambia el tipo MIME según el formato de la imagen
    res.send(imagen); // Envía los datos binarios de la imagen
  });
};

module.exports = {
  uploadFiles,
  obtenerImagen,
  obtenerFotoPerfil,
  subirFotoPerfil,
  subirFotoProfesional,
  obtenerFotoProfesional, // Nueva función exportada
};