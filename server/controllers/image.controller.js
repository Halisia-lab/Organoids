const Image = require("../models/image.model");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


class ImageController {


    static async getAllImages(req, res) {
        try {
            const images = await Image.findAll({
                order: [['id', 'ASC']]
            });
            res.status(200).json({ images });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getAllImagesInTesting(req, res) {
        const testingImages = [];
        try {

            const images = await Image.findAll({
                order: [['id', 'ASC']]
            });
            images.forEach(image => {
                if (image["url"].includes("testing/")) {
                    testingImages.push(image);
                }
            });
            res.status(200).json({ testingImages });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getAllImagesInTraining(req, res) {
        const trainingImages = [];
        try {

            const images = await Image.findAll({
                order: [['id', 'ASC']]
            });
            images.forEach(image => {
                if (image["url"].includes("training/")) {
                    trainingImages.push(image);
                }
            });
            res.status(200).json({ trainingImages });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getAllImagesInValidation(req, res) {
        const validationImages = [];
        try {

            const images = await Image.findAll({
                order: [['id', 'ASC']]
            });
            images.forEach(image => {
                if (image["url"].includes("validation/")) {
                    validationImages.push(image);
                }
            });
            res.status(200).json({ validationImages });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getImageById(req, res) {
        const id = req.params.id;
        try {
            const image = await Image.findOne({ where: { id: id } });
            res.status(200).json({ image });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }



    static async updateBrightnessById(req, res) {
        const id = req.params.id;
        const brightness = req.params.brightness;
        try {
            const image = await Image.findOne({ where: { id: id } });

            await image.update({ brightness: parseInt(brightness) });

            res.status(200).json({ image });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async updateContrastById(req, res) {
        const id = req.params.id;
        const contrast = req.params.contrast;
        try {
            const image = await Image.findOne({ where: { id: id } });

            await image.update({ contrast: parseInt(contrast) });

            res.status(200).json({ image });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

module.exports = ImageController;