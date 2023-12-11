const { generalDataModel, imagenModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");


const getInformeFilter = async (req, res) => {
  try {
    //const data = await generalDataModel.findAll({where: {idUser:req.idUser}});
    //res.send({ data});
    const body = req.body;
    const options = {
      where: {},
      
      order:[['createdAt', 'DESC']]
    };
    if (body.idUser !== undefined){
    options.where.idUser = body.idUser;}
    if (body.CID !== undefined){
      options.where.CID = body.CID;}
    if (body.Name !== undefined){
      options.where.Name = body.Name;}
    if (body.Ticket !== undefined){
      options.where.Ticket = body.Ticket;}
    if (body.DateTime !== undefined){
      options.where.DateTime = body.DateTime;}
    if (body.id !== undefined){
      options.where.id = body.id;}
      if (body.eliminacion_logica !== undefined){
        options.where.eliminacion_logica = body.eliminacion_logica;}            
    const data = await generalDataModel.findAll(options);
    res.send({ data});
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_INFORME");
  }

};

const getInformeByCID = async (req, res) => {
  try {
    console.log('entro getInformeByCID')
    const body = req.body;
    const options = {
      where: {},
      include: [
        {
          model: imagenModel,
          as: "imagen",
        },
      ],
    };
    console.log('validacion CID')
    if (body.CID !== undefined) {
      options.where.CID = body.CID;
    }

    const data = await generalDataModel.findAll(options);
    console.log('obtiene DATA')

    const result = data.reduce((accumulator, item) => {
      const { imagen, ...generalData } = item.toJSON();
      const imagenList = [imagen];
      accumulator.imagen = [...(accumulator.imagen || []), ...imagenList];
      return {  ...generalData,...accumulator };
    }, {});
    console.log('obtiene Resultado')

    res.send({ data: result });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_INFORME");
  }
};

const createInforme = async (req, res) => {
  try {
    req = matchedData(req);
    const data = await generalDataModel.create(req);
    await data.reload();
    const resultdata = {
      id: data.id, 
      CID: data.CID,
      Name: data.Name,
      PhoneNumber: data.PhoneNumber,
      Ticket: data.Ticket,
      BackupEquipment: data.BackupEquipment,
      AddressSede: data.AddressSede,
      Sede: data.Sede,
      DateTime: data.DateTime,
      ClientName: data.ClientName,
      ClientPhoneNumber: data.ClientPhoneNumber,
      Requirement: data.Requirement,
      createdAt:data.createdAt,
      eliminacion_logica:data.eliminacion_logica,
      Observation: data.Observation,
      idUser: data.idUser,
      observacion_pop_site: data.observacion_pop_site,
      conclusion: data.conclusion,
      id_tipo_ticket: data.id_tipo_ticket,
      id_codigoqr: data.id_codigoqr,
      id_vericom: data.id_vericom,
      id_ubicacion_atencion: data.id_ubicacion_atencion,
      id_estado_sup: data.id_estado_sup,
      id_empresa_contratista: data.id_empresa_contratista,
      id_tipo_trabajo: data.id_tipo_trabajo,
      id_distrito: data.id_distrito,
      id_penalizado: data.id_penalizado,
      id_documento: data.id_documento,
      NombreContratista: data.NombreContratista,
      nombre_contacto:data.nombre_contacto,
      numero_contacto:data.numero_contacto,
      sot:data.sot,
      ccr:data.ccr,
      status: data.status
    };
    res.send({ resultdata });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_INFORME");
  }
};

const updateInforme = async (req, res) => {
  try {
    const { id } = req.body; 

    //const { CID, idUser } = req.body;
    console.log('datos a usar :' + id)

    const {
      CID,
      Name,
      PhoneNumber,
      Ticket,
      BackupEquipment,
      AddressSede,
      Sede,
      DateTime,
      ClientName,
      ClientPhoneNumber,
      Requirement,
      Observation,
      eliminacion_logica,
      finishedAt,
      observacion_pop_site,
      conclusion,
      id_tipo_ticket,
      id_codigoqr,
      id_vericom,
      id_ubicacion_atencion,
      id_estado_sup,
      id_empresa_contratista,
      id_distrito,
      id_penalizado,
      id_documento,
      NombreContratista,
      numero_documento,
      id_tipo_trabajo,
      nombre_contacto,
      numero_contacto,
      sot,
      ccr,
      status,
    } = req.body;
    const updatedData = {
      CID,
      Name,
      PhoneNumber,
      Ticket,
      BackupEquipment,
      AddressSede,
      Sede,
      DateTime,
      ClientName,
      ClientPhoneNumber,
      Requirement,
      Observation,
      eliminacion_logica,
      finishedAt,
      observacion_pop_site,
      conclusion,
      id_tipo_ticket,
      id_codigoqr,
      id_vericom,
      id_ubicacion_atencion,
      id_estado_sup,
      id_empresa_contratista,
      id_distrito,
      id_penalizado,
      id_documento,
      id_tipo_trabajo,
      NombreContratista,
      nombre_contacto,
      numero_contacto,
      sot,
      ccr,
      status,
      numero_documento,
    }; 


    await generalDataModel.findOne({where: { id:id }}).then(
      async (registro) => {
        if (registro) {
          const updatedRowsCount= await registro.update(updatedData);
          res.send({
            message: "Informe actualizado correctamente",
            data: updatedRowsCount
          });
        } else {
          res
            .status(404)
            .send({ message: "informe no encontrado" });
        }
      }
    ).catch((error) => {
      console.error(error);
      handleHttpError(res, "ERROR_UPDATE_INFORME");
    });

    // const [updatedRowsCount, updatedRows] = await generalDataModel.update(updatedData, {
    //   where: { CID: CID,idUser:idUser },
    //   returning: true
    // });

    // if (updatedRowsCount === 1) {
    //   res.send({ message: "Informe actualizado correctamente", updatedRows });
    // } else {
    //   res.status(404).send({ message: "Informe sin cambios o informe no encontrado" });
    // }
  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_UPDATE_INFORME");
  }
};


module.exports = { getInformeFilter, getInformeByCID,createInforme,updateInforme };
