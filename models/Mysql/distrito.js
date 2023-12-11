const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const distrito = sequelize.define(
    "T_distrito",
    {
        id_distrito:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name_distrito:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_provincia:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = distrito; 