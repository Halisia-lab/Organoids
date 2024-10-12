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
}, {
    tableName: "Image",
    timestamps: false,
},
);

module.exports = Image;