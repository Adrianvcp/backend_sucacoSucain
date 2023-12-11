const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const estadosup = sequelize.define(
    "T_estado_sup",
    {
        id_estado_sup:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        value:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = estadosup; 