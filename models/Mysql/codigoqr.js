const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const codigoqr = sequelize.define(
    "T_codigoqr",
    {
        id:{
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

module.exports = codigoqr; 