const SegmentationController = require('../controllers/segmentation.controller');

const express = require('express');
const router = express.Router(); 

router.get('/', SegmentationController.getAllSegmentations);
router.get('/testing', SegmentationController.getAllSegmentationsInTesting);
router.get('/training', SegmentationController.getAllSegmentationsInTraining);
router.get('/validation', SegmentationController.getAllSegmentationsInValidation);
router.get('/image/:id', SegmentationController.getSegmentationByImageId);

module.exports = router;
