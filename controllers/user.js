const {userModel} = require('../models');
const { matchedData } = require("express-validator");
const { handleHttpError } = require('../utils/handleError');


const loginCtrl =async (req,res) => {
    try{    
        req = matchedData(req);
        const user = await userModel.findOne({where: {username:req.username}})        
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return
          }
        const Password = user.get('password');
        const check= Password==req.password? true : false;
        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 404);
            return
        }
        res.send({user})
    }catch(e){
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER")
      }
      
};

module.exports = {loginCtrl};