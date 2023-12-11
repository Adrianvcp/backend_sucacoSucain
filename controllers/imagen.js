const { imagenModel,generalDataModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const fs = require("fs");
const Client = require("ftp");
const { v4: uuidv4 } = require("uuid");
const { conexionFTP, uploadToFTP,downloadDirectoryFromFTP } = require('../config/ftp');
const Jimp = require("jimp")
const path = require('path');
const sharp = require("sharp");

//new
const projectRoot = path.resolve(__dirname, '..'); // Ruta de la carpeta principal (un nivel hacia arriba)

function getFullPath() {
  return path.join(projectRoot, 'downloads');
}

const createFolderIfNotExist = (rutaCarpeta) => {
  if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta);
    console.log('Carpeta creada:', rutaCarpeta);
  } else {
    console.log('La carpeta ya existe:', rutaCarpeta);
  }
};
//.

const findById = async (req, res) => {
  try {
    const id = req.body.id;
    const image = await imagenModel.findOne({ where: { CID: id } });

    if (!image) {
      return handleHttpError(res, "Imagen no encontrada", 404);
      //res.status(404).json({ error: 'Imagen no encontrada' });
    }

    return res.send({ image });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_IMAGE");
  }
};

//nuevo
//cambia la eliminacion logica a 1 
const saveImage = async (req, res) => {
  const inicio = new Date();
  console.log(inicio);
  try {
    console.log('1. EN SAVEIMAGE')

    const requiredFields = ["t_general_data_id", "CID", "Nivel1", "Description","nro_imagen"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      const missingFieldsMsg = missingFields.join(", ");
      console.log(`Falta dato(s): ${missingFieldsMsg}`)
      return res.status(400).json({ error: `Falta dato(s): ${missingFieldsMsg}` });
    }
    console.log('2. DESPUES DE VALIDACIONES')

    const imageFile = req.file;
    const uniqueId = uuidv4();
    console.log(uniqueId)

    const { t_general_data_id,nro_imagen,CID, Nivel1, Nivel2, Description } = req.body;
    //const t_general_data_id = parseInt(req.body.t_general_data_id);
    //const nro_imagen = parseInt(req.body.nro_imagen);

    console.log(t_general_data_id);
    console.log(nro_imagen);


    if (!imageFile) {
      return res.status(400).json({ error: "No se ha proporcionado ninguna imagen" });
    }

    console.log('3. POR ENTRAR A UPLOADTOSFTP')
    const inputImageBuffer = req.file.buffer; // Obtén la imagen desde req.file.buffer
    const gradosDeRotacion = 360;

    // await Jimp.read(inputImageBuffer)
    //   .then(async (image) => {
    //     image.rotate(gradosDeRotacion);
    //     const imageFileRotateBuffer = await image.getBufferAsync(Jimp.MIME_PNG); // Cambia el tipo MIME según tus necesidades

    //     const rutaImagen = `./downloads/${t_general_data_id.toString()}/${uniqueId}.png`; //path.join(directorioDownload, `${uniqueId}.png`);

    //     await uploadToFTP(
    //       imageFileRotateBuffer,
    //       t_general_data_id.toString(),
    //       `${t_general_data_id.toString()}/${uniqueId}.png`
    //     ).then(async () => {
    //       await image.writeAsync(rutaImagen);
    //     });
    //   })

    //   .catch((err) => {
    //     console.error(err);
    //   });

    await sharp(inputImageBuffer)
    .rotate()
    .toBuffer()
    .then(async (output_rotatedImageBuffer) => {
      
      const folderName = path.join(getFullPath(),`${t_general_data_id}`);
      const rutaImagen = path.join(getFullPath(),`${t_general_data_id}/${uniqueId}.png`);
        
      await uploadToFTP(
        output_rotatedImageBuffer,
        t_general_data_id.toString(),
        `${t_general_data_id.toString()}/${uniqueId}.png`
      ).then(async () => {
        createFolderIfNotExist(folderName)
        await fs.promises.writeFile(rutaImagen, output_rotatedImageBuffer);
      });
    })

    .catch((err) => {
      console.error(err);
    });
    
    console.log(typeof t_general_data_id);
    console.log(typeof nro_imagen);

    // Crear un objeto con los datos de la imagen
    const newImageData = {
      t_general_data_id,
      CID,
      Nivel1,
      Nivel2,
      URL: `${t_general_data_id}/${uniqueId}.png`,
      Description,
      nro_imagen: nro_imagen,
      eliminacion_logica: 0
    };

    // Guardar información de la imagen en la base de datos
    const newImage = await imagenModel.create(newImageData);

    const antes_fin = new Date();
    console.log(antes_fin);

    // await downloadDirectoryFromFTP(t_general_data_id);
    // await saveImageDirectoryTmp();

    
    const fin = new Date();
    console.log(fin);
    return res.status(200).json({
      message: 'Imagen guardada exitosamente en el servidor FTP y la base de datos',
      image: newImage,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al guardar la imagen" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.body;

    const requiredFields = ["id"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      const missingFieldsMsg = missingFields.join(", ");
      console.log(`Falta dato(s): ${missingFieldsMsg}`)
      return res.status(400).json({ error: `Falta dato(s): ${missingFieldsMsg}` });
    }

    // Crear un objeto con los datos
    const deleteImage = {
      id,
      eliminacion_logica: 1
    };

    // Eliminar imagen en la base de datos (eliminacion_logica : 1)
    const [updatedRowsCount, updatedRows] = await imagenModel.update(deleteImage, {
      where: { id: id }    });

    if (updatedRowsCount === 1) {
      res.status(200).send({ message: "Imagen eliminada", updatedRows });
    } else {
      res.status(404).send({ message: "Error al eliminar la imagen" });
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al guardar la imagen" });
  }
};

//Descripcion y orden(esto por implementar)
const editImage = async (req, res) => {
  try {
    
    const { id } = req.body; 


    const {
    t_general_data_id,
    CID,
    Nivel1,
    Nivel2,
    URL,
    Description,
    nro_imagen,
    createdAt,
    updatedAt,
    } = req.body;
    const updatedData = {
      t_general_data_id,
      CID,
      Nivel1,
      Nivel2,
      URL,
      Description,
      nro_imagen,
      createdAt,
      updatedAt,
    }; 


    await imagenModel.findOne({where: { id:id }}).then(
      async (registro) => {
        if (registro) {
          const updatedRowsCount = await registro.update(updatedData);
          res.status(200).send({
            message: "Imagen actualizada correctamente",
          });
        } else {
          res
            .status(404)
            .send({ message: "Imagen no encontrado" });
        }
      }
    ).catch((error) => {
      console.error(error);
      handleHttpError(res, "ERROR_UPDATE_IMAGE");
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al editrar la imagen" });
  }
};

//Get images
const getImages = async (req, res) =>{
  try {
    const informeId = req.params.id;
    const result = await downloadDirectoryFromFTP(informeId);
    
    if (result.length > 0) {
      console.log('entro getInformeByCID')

      try {
        console.log('entro getInformeByCID')
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
        if (informeId !== undefined) {
          options.where.id = informeId;
        }
    
        const data = await generalDataModel.findAll(options);
        console.log('obtiene DATA')
    
        const result = data.reduce((accumulator, item) => {
          const { imagen, ...generalData } = item.toJSON();
          const imagenList = imagen;
          accumulator.imagen = [...(accumulator.imagen || []), ...imagenList];
          return {  ...generalData,...accumulator };
        }, {});
        console.log('obtiene Resultado')
    
        // res.send({ data: result });
        return res.status(200).json(
          result.imagen
        );
      } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_INFORME");
      }


    } else {
      return res.status(200).json(
        result.imagen
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al traer la(s) imagen(es)" });
  }
};

const getImage = async (req, res) =>{
  try {
    const id = req.params.id;
    const name = req.params.name;

    // Obtiene la ruta a la foto
    const photoPath = path.resolve(`./downloads/${id}/${name}`);

    return res.sendFile(photoPath, { 'Content-Type': 'image/jpeg' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al traer la(s) imagen(es)" });
  }
};




module.exports = {
  findById,
  saveImage,
  deleteImage,
  editImage,
  getImages,
  getImage
};
