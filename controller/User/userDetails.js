const userModel = require("../../models/userModel")

async function userDetailscontroller(req,res){
    try{
         const user = await userModel.find()
         res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user details" 
         })
    }catch(err){
       res.status(400).json({
        message:err.message || err ,
        error:true,
        success:false
       })
    }
}

module.exports = userDetailscontroller
