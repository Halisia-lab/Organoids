const SegmentationController = require('../controllers/segmentation.controller');

const express = require('express');
const router = express.Router(); 

router.get('/', SegmentationController.getAllSegmentations);
router.get('/:id', SegmentationController.getSegmentationById);
router.get('/testing', SegmentationController.getAllSegmentationsInTesting);
router.get('/training', SegmentationController.getAllSegmentationsInTraining);
router.get('/validation', SegmentationController.getAllSegmentationsInValidation);
router.get('/image/:id', SegmentationController.getSegmentationByImageId);
router.put('/:id/brightness/:brightness', SegmentationController.updateBrightnessById);
router.put('/:id/contrast/:contrast', SegmentationController.updateContrastById);


module.exports = router;
