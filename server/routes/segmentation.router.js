const SegmentationController = require('../controllers/segmentation.controller');

const express = require('express');
const router = express.Router(); 

router.get('/', SegmentationController.getAllSegmentations);
router.get('/:id', SegmentationController.getSegmentationById);
router.get('/segmentation/testing', SegmentationController.getAllSegmentationsInTesting);
router.get('/segmentation/training', SegmentationController.getAllSegmentationsInTraining);
router.get('/segmentation/validation', SegmentationController.getAllSegmentationsInValidation);
router.get('/image/:id', SegmentationController.getSegmentationByImageId);
router.put('/:id/brightness/:brightness', SegmentationController.updateBrightnessById);
router.put('/:id/contrast/:contrast', SegmentationController.updateContrastById);


module.exports = router;
