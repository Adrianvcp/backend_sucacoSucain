const Client = require("ftp");
const { createPool } = require("generic-pool");
const async = require("async");
var fs = require('fs');

const ftpConfig = {
  host: process.env.FTP_HOST,
  port: 21,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
};

const maxConnections = 8; 

const conexionFTPQueue = async.queue(async (task, callback) => {
  try {
    const client = await conexionFTP();
    await task(client);
    client.destroy();
    callback();
  } catch (error) {
    callback(error);
  }
}, maxConnections);


const conexionFTP = () => {
  return new Promise((resolve, reject) => {
    const client = new Client();

    client.on("ready", () => {
      console.log("FTP Conexión Correcta!");
      resolve(client);
    });

    client.on("error", (err) => {
      console.log("FTP Error de Conexión", err);
      reject(err);
    });

    client.connect(ftpConfig);
  });
};

const uploadToFTP = (imageBuffer, t_general_data_id, destinationPath) => {
  console.log('uploadToFTP');
  return new Promise((resolve, reject) => {

    const task = async (client) => {
      try {
        const folderName = t_general_data_id;

        const list = await getClientList(client);

        const folderExists = list.some(
          (item) => item.type === "d" && item.name === folderName
        );

        if (!folderExists) {
          await createFolder(client, folderName);
        }

        await uploadImage(client, imageBuffer, destinationPath);

        console.log(
          `Imagen guardada exitosamente en el servidor FTP: ${destinationPath}`
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    };

    conexionFTPQueue.push(task, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

  });
};

const getClientList = (client,nameFolder = "/") => {
  
  return new Promise((resolve, reject) => {
    client.list(nameFolder, (err, list) => {
      if (err) {
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
};

// Crear una carpeta en el servidor FTP.
const createFolder = (client, folderName) => {
  return new Promise((resolve, reject) => {
    client.mkdir(folderName, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`La carpeta '${folderName}' ha sido creada.`);
        resolve();
      }
    });
  });
};

// Cargar la imagen en el servidor FTP.
const uploadImage = (client, imageBuffer, destinationPath) => {
  return new Promise((resolve, reject) => {
    client.put(imageBuffer, destinationPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const downloadDirectoryFromFTP = (folderName) => {
  console.log('downloadDirectoryFromFTP');
  return new Promise(async (resolve, reject) => {
    const task = async (client) => {
      try {
        // Obtener la lista de archivos en el directorio especificado
        const list = await getClientList(client, folderName);
        
        console.log(typeof list[0]);

        // Filtrar y obtener solo los nombres de archivo (excluir carpetas)
        const fileNames = list
          .filter((item) => item.type === '-')
          .map((item) => item.name);
        
        console.log(typeof fileNames[0]);

        for (let index = 0; index < fileNames.length; index++) {
          console.log(fileNames[index]);
        }
        if (fileNames.length === 0) {
          console.log(`No hay archivos para descargar en la carpeta ${folderName}.`);
          resolve([]);
        } else {


          await createFolderIfNotExist(`./downloads/${folderName}`);

          const tasks = fileNames.map(async (fileName) => {
            const sourcePath = `/${folderName}/${fileName}`;  // Ruta de origen en el FTP
            const destinationPath = `./downloads/${folderName}/${fileName}`;  // Ruta de destino local
            if (!fs.existsSync(destinationPath)) {
              try {
                console.log("Iniciando descarga para", sourcePath);
                 await downloadFile(client, sourcePath, destinationPath);
                console.log(`Archivo descargado: ${fileName}`);
              } catch (error) {
                console.error(
                  `Error al descargar el archivo ${sourcePath}: ${error}`
                );
              }
            }
          });
          
          // console.log('Después de definir las tareas');
          // console.log(typeof tasks);
          // console.log(tasks.length);
          
          // for (let index = 0; index < tasks.length; index++) {
          //   console.log(tasks[index]);
          // }
          
          await Promise.all(tasks);
          resolve(fileNames);
          

        }
      } catch (error) {
        reject(error);
      }
    };

    conexionFTPQueue.push(task, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

  });
};

const createFolderIfNotExist = (rutaCarpeta) => {
  if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta);
    console.log('Carpeta creada:', rutaCarpeta);
  } else {
    console.log('La carpeta ya existe:', rutaCarpeta);
  }
};


// Función para descargar un archivo específico
const downloadFile = (client, sourcePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    client.get(sourcePath, (err, stream) => {
      if (err) {
        reject(`Error al descargar el archivo ${sourcePath}: ${err.message}`);
      }


      if (!stream) {
        reject(`No se pudo obtener el stream para el archivo ${sourcePath}`);
        return;
      }

      stream.on('error', (error) => {
        reject(`Error durante la transmisión del archivo ${sourcePath}: ${error.message}`);
      });

      stream.once('close', () => resolve(destinationPath));
      stream.pipe(fs.createWriteStream(destinationPath));
    });
  });
};

module.exports = { conexionFTP, uploadToFTP,downloadDirectoryFromFTP };