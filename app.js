require("dotenv").config();
const express = require("express");
const cors = require("cors");
const{dbConnectMySql} = require("./config/mysql")
const{conexionFTP} = require("./config/ftp")
const app = express();
var cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// cron.schedule('0 9 * * *', () => {
//     console.log('limpieza archivos downloads');
//     try {

//         directoryPath = './downloads';
//         // Contenido directorio
//         fs.readdir(directoryPath, (err, files) => {
//           if (err) {
//             throw new Error('Error al leer el directorio: ' + err.message);
//           }
    
//           for (const file of files) {
//             const filePath = path.join(directoryPath, file);
    
//             // Verifica si es una  carpeta
//             if (fs.lstatSync(filePath).isDirectory()) {
//               // Lo elimina
//               fs.rmSync(filePath, { recursive: true });
//               console.log('Carpeta eliminada:', filePath);
//             }
//           }
//         });
//       } catch (error) {
//         console.error('Error al eliminar carpetas:', error.message);
//       }

//   }
//   //,{
//   //  scheduled: true,
//   //  timezone: "America/Lima"
//   //}
//   );

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api",require("./routes"))

app.listen(port,() => {
    console.log('Connecting to http://localhost:'+port)
});


dbConnectMySql();
//conexionFTP();