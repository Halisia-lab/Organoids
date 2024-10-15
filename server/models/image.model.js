const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Image = sequelize.define("Image", {

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
    brightness: {
        type: DataTypes.INTEGER,
    },
    contrast: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: "Image",
    timestamps: false,
},
);

module.exports = Image;