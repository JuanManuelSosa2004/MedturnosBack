const fs = require('fs');
const {
  guardarArchivoNota,
  obtenerImagenNota,
  obtenerPerfilUsuario,
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
  const { id_nota } = req.params; // Obtén el ID de la nota desde los parámetros de la URL

  obtenerImagenNota(id_nota, (err, results) => {
    if (err) {
      console.error('Error al recuperar la imagen:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }

    const imagen = results[0].imagenes;

    // Configura el encabezado para enviar la imagen
    res.setHeader('Content-Type', 'image/webp'); // Cambia el tipo MIME según el formato de la imagen
    res.send(imagen); // Envía los datos binarios de la imagen
  });
};

// Recuperar foto de perfil
const obtenerFotoPerfil = (req, res) => {
  const { id_perfil } = req.params; // Obtén el ID del usuario desde los parámetros de la URL

  obtenerPerfilUsuario(id_perfil, (err, results) => {
    if (err) {
      console.error('Error al recuperar la foto de perfil:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0 || !results[0].perfil) {
      return res.status(404).json({ mensaje: 'Foto de perfil no encontrada' });
    }

    const imagen = results[0].perfil;

    // Configura el encabezado para enviar la imagen
    res.setHeader('Content-Type', 'image/webp'); // Cambia el tipo MIME según el formato de la imagen
    res.send(imagen); // Envía los datos binarios de la imagen
  });
};

module.exports = { uploadFiles, obtenerImagen, obtenerFotoPerfil };