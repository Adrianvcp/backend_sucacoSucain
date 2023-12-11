const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const provincia = sequelize.define(
    "T_provincia",
    {
        id_provincia:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name_provincia:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = provincia; 