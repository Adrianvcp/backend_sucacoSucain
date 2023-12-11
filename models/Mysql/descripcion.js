const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Descripcion = sequelize.define(
    "T_Descripcion",
    {
        titulo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtitulo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: "descripcion_seccion",

    },
);


module.exports = Descripcion;