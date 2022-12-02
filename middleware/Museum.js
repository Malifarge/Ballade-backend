const mongoose = require("mongoose")
const Museum = require("../models/Museums");

const checkIfMuseumExist = async (req,res,next) =>{
    try{
        const _id = mongoose.Types.ObjectId(req.params)
        const museum = await Museum.findOne({_id})
        if (museum){
            req.museum=museum
            req._id = _id
            next()
        }else{
            res.status(404).json("Museum not found")
        }
    }
    catch(e){
        res.status('404').json("invalid Id")
        console.log(e);
    }

}

module.exports = {checkIfMuseumExist}