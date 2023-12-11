const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const tipoproyecto = sequelize.define(
    "T_tipo_proyecto",
    {
        id_tipo_proyecto:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name_tipo_proyecto:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = tipoproyecto; 