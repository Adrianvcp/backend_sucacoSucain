const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const ubicacionatencion = sequelize.define(
    "T_ubicacion_atencion",
    {
        id_ubicacion_atencion:{
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

module.exports = ubicacionatencion; 