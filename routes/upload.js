const express = require('express');
const router = express.Router();
const UploadsController = require('../controllers/uploads.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// TESTING
router.post('/', upload.array('archivo'), UploadsController.uploadFiles);

module.exports = router;
