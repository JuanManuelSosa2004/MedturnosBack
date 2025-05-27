const express = require('express');
const router = express.Router();
const multer = require('multer');
const UploadsController = require('../controllers/uploadsController');
const verificarToken = require('../token'); // Importa directamente la función

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
router.post('/subir', upload.single('archivo'), UploadsController.uploadFiles);

// Ruta para recuperar imágenes
router.get('/:id_nota', UploadsController.obtenerImagen);
router.post('/FotoPerfil', verificarToken, upload.single('archivo'), UploadsController.subirFotoPerfil);

// Endpoint para subir fotos de profesionales
router.post('/profesionales/foto', upload.single('imagen'), UploadsController.subirFotoProfesional);

module.exports = router;