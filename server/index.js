const express = require('express');
var bodyParser = require('body-parser');

const imageRouter = require('./routes/image.router');
const segmentationRouter = require('./routes/segmentation.router');

const { testDbConnection } = require('./config/db');

const app = express();

app.use(bodyParser.json());

app.use('/images', imageRouter);
app.use('/segmentations', segmentationRouter);
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
    res.status(500).json({ error: 'Internal Server Error' });
});



module.exports = app;