const { codigoqrModel,provinciaModel,distritoModel,tipoproyectoModel,tipotrabajoModel,vericomModel,tipoticketModel,ubicacionatencionModel,estadosupModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const getDropdowndatalist = async (req, res) => {
  try {

    /*const datacodigoqr = await codigoqrModel.findAll();
    const datatipoproyecto = await tipoproyectoModel.findAll();
    const datatipotrabajo = await tipotrabajoModel.findAll();
    const datatipoticket = await tipoticketModel.findAll();
    const datavericom = await vericomModel.findAll();
    const dataubicacionatencion = await ubicacionatencionModel.findAll();
    const dataestadosup = await estadosupModel.findAll();
    const dataprovincia = await provinciaModel.findAll();
    const datadistrito = await distritoModel.findAll();*/

const queryT = `select 'codigo_qr' as tableName, qr.id as ID, qr.value as value, '' as ID2 ,'' as value2  from T_codigoqr qr

UNION

select 'estado_sup' as tableName, estSup.id_estado_sup as ID, estSup.value  as value, '' as ID2 ,'' as value2  from T_estado_sup estSup

UNION

select 'tipo_ticket' as tableName, tck.id_tipo_ticket  as ID, tck.name_tipo_ticket  as value, '' as ID2 ,'' as value2  from T_tipo_ticket tck

UNION

select 't_empresa_contratista' as tableName, tec.id_empresa_contratista  as ID, tec.name_empresa_contratista  as value, '' as ID2 ,'' as value2  from T_empresa_contratista tec   

UNION

select 'vericom' as tableName, tv.id as ID, tv.value as value, '' as ID2 ,'' as value2  from T_vericom tv

UNION

select 'ubi_atencion' as tableName, tua.id_ubicacion_atencion  as ID, tua.value  as value, '' as ID2 ,'' as value2  from T_ubicacion_atencion tua

UNION

(

select 'proyecto_trabajo' as tableName,tp.id_tipo_proyecto  as ID ,tp.name_tipo_proyecto as value, tt.id_tipo_trabajo  as ID, tt.value  as value2

from T_tipo_proyecto tp JOIN T_tipo_trabajo tt  ON tp.id_tipo_proyecto  = tt.id_tipo_proyecto

)

UNION

(

select 'provincia_distrito' as tableName, prv.id_provincia  as ID, prv.name_provincia  as value, dis.id_distrito as ID2 ,dis.name_distrito  as value2

from T_provincia prv INNER JOIN T_distrito dis ON prv.id_provincia = dis.id_provincia  where dis.habilitado  = 1 and prv.habilitado = 1

)

UNION

(

select 'penalizado' as tableName, tpena.id  as ID, tpena.value  as value, '' as ID2 ,''  as value2

from T_Penalizado tpena

)

UNION

(

select 'documento_tabla' as tableName, tdc.id  as ID, tdc.value  as value, '' as ID2 ,''  as value2

from T_documento tdc

)
`
    const data = await sequelize.query(queryT, {       type: QueryTypes.SELECT    });

    res.send({ data});
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_DROPDOWNDATA");
  }

};

module.exports = { getDropdowndatalist };