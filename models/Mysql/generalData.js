
const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const moment = require('moment-timezone')

const generalData = sequelize.define(
    "T_GeneralData",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CID:{
            type: DataTypes.STRING,
        },
        Name:{
            type: DataTypes.STRING,
        },
        PhoneNumber:{
            type: DataTypes.STRING,
        },
        Ticket:{
            type: DataTypes.STRING,
        },
        BackupEquipment:{
            type: DataTypes.STRING,
        },
        AddressSede:{
            type: DataTypes.STRING,
        },
        Sede:{
            type: DataTypes.STRING,
        },
        DateTime:{
            type: DataTypes.STRING,
        },
        ClientName:{
            type: DataTypes.STRING,
        },
        ClientPhoneNumber:{
            type: DataTypes.STRING,
        },
        Requirement:{
            type: DataTypes.JSON,
        },
        Observation:{
            type: DataTypes.STRING,
        },
        NombreContratista:{
            type: DataTypes.STRING,
        },
        idUser:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.DATE,
        },
        eliminacion_logica:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        finishedAt:{
            type: DataTypes.DATE,
        },
        observacion_pop_site:{
            type: DataTypes.STRING,
        },
        conclusion:{
            type: DataTypes.STRING,
        },
        id_tipo_ticket:{
            type: DataTypes.INTEGER,
        },
        id_codigoqr:{
            type: DataTypes.INTEGER,
        },
        id_vericom:{
            type: DataTypes.INTEGER,
        },
        id_ubicacion_atencion:{
            type: DataTypes.INTEGER,
        },
        id_estado_sup:{
            type: DataTypes.INTEGER,
        },
        id_empresa_contratista:{
            type: DataTypes.INTEGER,
        },
        id_tipo_trabajo:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_distrito:{
            type: DataTypes.INTEGER,
        },
        id_penalizado:{
            type: DataTypes.INTEGER,
        },
        id_documento:{
            type: DataTypes.INTEGER,
        },
        status:{
            type: DataTypes.STRING,
            defaultValue: 'pendiente',
        },
        numero_documento:{
            type: DataTypes.STRING,
        },
        nombre_contacto:{
            type: DataTypes.STRING,
        },
        numero_contacto:{
            type: DataTypes.STRING,
        },
        sot:{
            type: DataTypes.STRING,
        },
        ccr:{
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);

// Hook beforeCreate para ajustar createdAt a una zona horaria específica
generalData.beforeCreate((informe, opciones) => {
    const zonaHorariaDeseada = 'America/Lima';
    const fechaAjustada = moment().tz(zonaHorariaDeseada).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    informe.createdAt = fechaAjustada;
});

module.exports = generalData; 