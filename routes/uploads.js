const express = require('express');
const router = express.Router();
const multer = require('multer');
const UploadsController = require('../controllers/uploadsController');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta temporal para almacenar imágenes
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
  },
});
const upload = multer({ storage });

// Ruta para subir imágenes
router.post('/', upload.single('archivo'), UploadsController.uploadFiles);

// Ruta para recuperar imágenes
router.get('/:id_nota', UploadsController.obtenerImagen);

module.exports = router;