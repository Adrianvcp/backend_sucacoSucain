const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const moment = require('moment-timezone')

const Imagen = sequelize.define(
    "T_Imagen",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        t_general_data_id:{
            type: DataTypes.INTEGER,
        },
        CID:{
            type: DataTypes.STRING,
        },
        Nivel1:{
            type: DataTypes.STRING,
        },
        Nivel2:{
            type: DataTypes.STRING,
        },
        URL:{
            type: DataTypes.STRING,
        },
        Description:{
            type: DataTypes.STRING,
        },
        nro_imagen:{
            type: DataTypes.INTEGER,
        },
        createdAt:{
            type: DataTypes.DATE,
        },
        eliminacion_logica:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        updatedAt:{
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
        tableName: "T_Imagen",

    },
);

// Hook beforeCreate para ajustar createdAt a una zona horaria específica
Imagen.beforeCreate((imagen, opciones) => {
    const zonaHorariaDeseada = 'America/Lima';
    const fechaAjustada = moment().tz(zonaHorariaDeseada).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    imagen.createdAt = fechaAjustada;
});

// Hook beforeCreate para ajustar updatedAt a una zona horaria específica
Imagen.beforeUpdate((imagen, opciones) => {
    const zonaHorariaDeseada = 'America/Lima';
    const fechaAjustada = moment().tz(zonaHorariaDeseada).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    imagen.updatedAt = fechaAjustada;
});


module.exports = Imagen;