const generalDataModel = require('./Mysql/generalData');
const imagenModel = require('./Mysql/imagen');

const models = {
    userModel: require('./Mysql/user'),
    imagenModel: require('./Mysql/imagen'),
    generalDataModel: require('./Mysql/generalData'),
    descripcionModel: require('./Mysql/descripcion')
}

// Definición de la relación entre GeneralData y imagenModel
// imagenModel.hasMany(generalDataModel, {
//   foreignKey: 'id',
//   sourceKey: 't_general_data_id',
//   as: 'generalData' 
// });

// generalDataModel.belongsTo(imagenModel, {
//   foreignKey: 'id',
//   targetKey: 't_general_data_id',
//   as: 'imagen' 
// });

//Relacion 
generalDataModel.hasMany(imagenModel,{
  foreignKey: "t_general_data_id",
  as: 'imagen' 
});
//Relacion 
imagenModel.belongsTo(generalDataModel,{
  foreignKey: "t_general_data_id",
  as: 'generalData'
});

module.exports = models