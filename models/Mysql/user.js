const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "Users",
    {
        idUser:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);
User.find = User.findAll;
User.findById = User.findByPk;
module.exports = User;