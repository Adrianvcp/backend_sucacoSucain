const express = require("express");
const { getInformeFilter,getInformeByCID,createInforme,updateInforme } = require("../controllers/generalData");
const router = express.Router();
const { validatorCreateGeneralData,validatorUpdateGeneralData,validatorGetGeneralData } = require("../validators/generalData");

router.post("/list",getInformeFilter);
router.post("/informe",getInformeByCID);
router.post("/create",validatorCreateGeneralData,createInforme);
router.patch("/update",validatorUpdateGeneralData,updateInforme);

module.exports = router;