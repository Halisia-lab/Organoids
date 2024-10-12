const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Image = require("./image.model");

const Segmentation = sequelize.define("Segmentation", {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    maskArea: {
        type: DataTypes.INTEGER,
    },
    brightness: {
        type: DataTypes.INTEGER,
    },
    contrast: {
        type: DataTypes.INTEGER,
    },
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Image',
            key: 'id'
        }
    },  
}, {
    tableName: "Segmentation",
    timestamps: false,
},
);

Image.hasOne(Segmentation,{ foreignKey: "imageId"});

module.exports = Segmentation;