const ImageController = require('../controllers/image.controller');

const express = require('express');
const router = express.Router(); 

router.get('/', ImageController.getAllImages);
router.get('/testing', ImageController.getAllImagesInTesting);
router.get('/training', ImageController.getAllImagesInTraining);
router.get('/validation', ImageController.getAllImagesInValidation);
router.get('/:id', ImageController.getImageById);

module.exports = router;
