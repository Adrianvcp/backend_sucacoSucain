const { conexionFTP } = require("../config/ftp");

const validateAndCreateFolder = async (req, res, next) => {

  try {
    console.log('veamos la data ')

    const CID = req.body.CID;
    if (CID === undefined) {
      return res.status(400).json({ error: "Falta dato CID" });
    }
    
    const ftpConnect = await conexionFTP();
    console.log("1");

    const folderName = CID;
    ftpConnect.list("/", (err, list) => {
      console.log("2");

      if (err) {
        console.error(err);
        //ftpConnect.end();
        return res
          .status(500)
          .json({
            error: "Error al obtener la lista de archivos del directorio",
          });
      }

      const folderExists = list.some(
        (item) => item.type === "d" && item.name === folderName
      );
      if (!folderExists) {
        console.log("3");

        ftpConnect.mkdir(folderName, (err) => {
          //ftpConnect.end();
          if (err) {
            console.error(err);
            console.log(folderName)
            return res
              .status(500)
              .json({ error: "Error al crear la carpeta en el servidor FTP" });
          } else {
            console.log(`La carpeta '${folderName}' ha sido creada.`);
            next();
          }
        });
      } else {
        console.log(
          `La carpeta '${folderName}' ya existe. No se realizará ninguna acción adicional.`
        );
        //ftpConnect.end();
        next();
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al establecer la conexión FTP" });
  }
};

module.exports = validateAndCreateFolder;
