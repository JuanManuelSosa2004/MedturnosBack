const db = require('../config/db'); // Conexión a la base de datos
const fs = require('fs'); // Para manejar archivos

// Subir archivo
const uploadFiles = (req, res) => {
  // Verifica si se subió un archivo
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se proporcionó ningún archivo' });
  }

  // Obtén los datos del cuerpo de la solicitud
  const { id_turno, contenido } = req.body;

  try {
    // Lee el archivo subido como binario
    const archivo = fs.readFileSync(req.file.path);
    
    // Consulta SQL para insertar en la tabla `notasmedicas`
    const query = `
      INSERT INTO notasmedicas (id_turno, contenido, imagenes)
      VALUES (?, ?, ?)
    `;

    // Ejecuta la consulta
    db.query(query, [id_turno, contenido, archivo], (err, result) => {
      if (err) {
        console.error('Error al guardar el archivo en la base de datos:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      // Elimina el archivo temporal después de guardarlo
      fs.unlinkSync(req.file.path);

      // Responde con éxito
      res.status(201).json({ mensaje: 'Archivo subido con éxito', id: result.insertId });
    });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Recuperar archivo
const obtenerImagen = (req, res) => {
  const { id_nota } = req.params; // Obtén el ID de la nota desde los parámetros de la URL

  const query = 'SELECT imagenes FROM notasmedicas WHERE id_nota = ?';

  db.query(query, [id_nota], (err, results) => {
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

module.exports = { uploadFiles, obtenerImagen };