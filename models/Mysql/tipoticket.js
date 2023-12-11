const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const tipoticket = sequelize.define(
    "T_tipo_ticket",
    {
        id_tipo_ticket:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name_tipo_ticket:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = tipoticket; 