const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const imageRouter = require('./routes/image.router');
const segmentationRouter = require('./routes/segmentation.router');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/images', imageRouter);
app.use('/segmentations', segmentationRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
    res.status(500).json({ error: 'Internal Server Error' });
});


module.exports = app;

///
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Chemin vers le dossier racine
const rootDir = '/Users/halisia/Downloads/Dataset/MouseOrganoids';

const csvWriterImages = createCsvWriter({
    path: 'images.csv',
    header: [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'url', title: 'url' },
        { id: 'brightness', title: 'brightness' },
        { id: 'contrast', title: 'contrast' },
    ]
});

const csvWriterSegmentations = createCsvWriter({
    path: 'segmentations.csv',
    header: [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'url', title: 'url' },
        { id: 'segmentationArea', title: 'segmentationArea' },
        { id: 'opacity', title: 'opacity' },
        { id: 'imageId', title: 'imageId' },
    ]
});
const getAllImagePaths = () => {
    const imageData = [];
    const segmentationData = [];
    var segmentationId = 0;
    var imageId = 0;

    const imageIdMap = {};
    // Parcourir les dossiers "testing", "training", "validation"
    ['testing', 'training', 'validation'].forEach(directory => {
        // Sous-dossiers "images" et "segmentations"
        //  ['images', 'segmentations'].forEach(subfolder => {
        const imagesFolderPath = path.join(rootDir, directory, 'images');

        // Vérifier si le dossier existe
        if (fs.existsSync(imagesFolderPath)) {
            // Lire tous les fichiers du dossier
            fs.readdirSync(imagesFolderPath).forEach(file => {
                const fileExtension = path.extname(file).toLowerCase();
                // Filtrer les fichiers d'image (ex: .jpg, .png, .jpeg)
                if (['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
                    imageId++;
                    imageData.push({
                        id: imageId,
                        name: file,
                        url: path.join(directory, 'images', file),
                        brightness: 100,
                        contrast: 100,
                    });

                    imageIdMap[file] = imageId;
                }
            });
        }


        const segmentationFolderPath = path.join(rootDir, directory, 'segmentations');

        // Vérifier si le dossier existe
        if (fs.existsSync(segmentationFolderPath)) {
            // Lire tous les fichiers du dossier
            fs.readdirSync(segmentationFolderPath).forEach(file => {
                const fileExtension = path.extname(file).toLowerCase();
                // Filtrer les fichiers d'image (ex: .jpg, .png, .jpeg)
                if (['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
                    segmentationId++;
                    const imageName = file; // 
                    const associatedImageId = imageIdMap[imageName];
                    segmentationData.push({
                        id: segmentationId,
                        name: file,
                        url: path.join(directory, 'segmentations', file),
                        segmentationArea: 0,
                        opacity: 50,
                        imageId: associatedImageId || null,
                    });
                }
            });
        }
        // });
    });

    csvWriterImages.writeRecords(imageData) // écrire les données dans le fichier CSV
        .then(() => {
            console.log('CSV file created successfully.');
        })
        .catch(err => {
            console.error('Error writing CSV file', err);
        });

    csvWriterSegmentations.writeRecords(segmentationData) // écrire les données dans le fichier CSV
        .then(() => {
            console.log('CSV file created successfully.');
        })
        .catch(err => {
            console.error('Error writing CSV file', err);
        });
};

getAllImagePaths();
//////
