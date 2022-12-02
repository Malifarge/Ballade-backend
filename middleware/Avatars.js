const mongoose = require("mongoose")
const Avatars = require("../models/Avatars");

const checkIfAvatarExist = async (req,res,next) =>{
    try{
        const _id = mongoose.Types.ObjectId(req.params)
        const avatar = await Avatars.findOne({_id})
        if (avatar){
            req._id = _id
            req.avatar = avatar
            next()
        }else{
            res.status(404).json("Avatar not found")
        }
    }
    catch(e){
        res.status('404').json("invalid Id")
        console.log(e);
    }

}

module.exports = {checkIfAvatarExist}