const ImageController = require('../controllers/image.controller');

const express = require('express');
const router = express.Router();

router.get('/', ImageController.getAllImages);
router.get('/testing', ImageController.getAllImagesInTesting);
router.get('/training', ImageController.getAllImagesInTraining);
router.get('/validation', ImageController.getAllImagesInValidation);
router.get('/:id', ImageController.getImageById);
router.put('/:id/brightness/:brightness', ImageController.updateBrightnessById);
router.put('/:id/contrast/:contrast', ImageController.updateContrastById);

module.exports = router;
