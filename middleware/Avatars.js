const mongoose = require("mongoose")
const Avatars = require("../models/Avatars");

const checkIfAvatarExist = async (req,res,next) =>{
    try{
        const _id = mongoose.Types.ObjectId(req.params)
        const user = await Avatars.findOne({_id})
        if (user){
            req._id = _id
            next()
        }else{
            res.status(404).json("User not found")
        }
    }
    catch(e){
        res.status('404').json("invalid Id")
    }

}

module.exports = {checkIfAvatarExist}