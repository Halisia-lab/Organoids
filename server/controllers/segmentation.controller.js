const Segmentation = require("../models/segmentation.model");

class SegmentationController {
    static async getAllSegmentations(req, res) {

        try {
            const segmentations = await Segmentation.findAll({
                order: [['id', 'ASC']]
            });
            res.status(200).json({ segmentations });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getAllSegmentationsInTesting(req, res) {
        const testingSegmentations = [];
        try {
            const segmentations = await Segmentation.findAll({
                order: [['id', 'ASC']]
            });
            segmentations.forEach(segmentation => {
                if (segmentation["url"].includes("testing/")) {
                    testingSegmentations.push(segmentation);
                }
            });

            res.status(200).json({ testingSegmentations });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllSegmentationsInTraining(req, res) {
        const trainingSegmentations = [];
        try {

            const segmentations = await Segmentation.findAll({
                order: [['id', 'ASC']]
            });
            segmentations.forEach(segmentation => {
                if (segmentation["url"].includes("training/")) {
                    trainingSegmentations.push(segmentation);
                }
            });
            res.status(200).json({ trainingSegmentations });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getAllSegmentationsInValidation(req, res) {
        const validationSegmentations = [];
        try {

            const segmentations = await Segmentation.findAll({
                order: [['id', 'ASC']]
            });
            segmentations.forEach(segmentation => {
                if (segmentation["url"].includes("validation/")) {
                    validationSegmentations.push(segmentation);
                }
            });
            res.status(200).json({ validationSegmentations });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getSegmentationByImageId(req, res) {
        const imageId = req.params.id;
        try {
            const segmentation = await Segmentation.findOne({ where: { imageId: imageId } });
            res.status(200).json({ segmentation });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getSegmentationById(req, res) {
        const id = req.params.id;
        try {
            const segmentation = await Segmentation.findOne({ where: { id: id } });
            res.status(200).json({ segmentation });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async updateOpacityById(req, res) {
        const id = req.params.id;
        const opacity = req.params.opacity;
        try {
            const segmentation = await Segmentation.findOne({ where: { id: id } });

            await segmentation.update({ opacity: parseInt(opacity) });

            res.status(200).json({ segmentation });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

}

module.exports = SegmentationController;