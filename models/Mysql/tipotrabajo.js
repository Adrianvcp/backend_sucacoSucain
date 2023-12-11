const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const tipotrabajo = sequelize.define(
    "T_tipo_trabajo",
    {
        id_tipo_trabajo:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        value:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_tipo_proyecto:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = tipotrabajo; 