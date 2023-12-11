const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const { generalDataModel } = require("../models");

const validatorCreateGeneralData = [
    check("id_tipo_trabajo")
    .notEmpty(),
    check("idUser")
    .notEmpty(),
    check("Requirement")
    .notEmpty(),
    check("id_tipo_ticket")
    .notEmpty(),
    check("id_codigoqr")
    .notEmpty(),
    check("id_vericom")
    .notEmpty(),
    check("id_ubicacion_atencion")
    .notEmpty(),
    check("id_estado_sup")
    .notEmpty(),
    check("id_penalizado")
    .notEmpty(),
    check("id_distrito")
    .notEmpty(),
    check("id_empresa_contratista")
    .notEmpty(),
    check("id_documento")
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validatorUpdateGeneralData = [
    check("id")
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorOthersCIDGeneralData = [
    check("id")
    .notEmpty(),
    check("CID")
    .notEmpty(),
    check("Name"),
    check("PhoneNumber"),
    check("Ticket"),
    check("BackupEquipment"),
    check("AddressSede"),
    check("Sede"),
    check("DateTime"),
    check("ClientName"),
    check("Requirement"),
    check("Observation"),
    check("idUser")
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorGetGeneralData = [
    check("idUser")
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = {validatorCreateGeneralData,validatorUpdateGeneralData,validatorOthersCIDGeneralData,validatorGetGeneralData};