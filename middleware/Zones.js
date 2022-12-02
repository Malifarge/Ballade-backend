const mongoose = require('mongoose')
const Zones = require('../models/Zones')

const checkIfZoneExist = async (req,res)=>{
   try{
        const _id = mongoose.Types.ObjectId(req.params)
        const zone = await Zones.findOne({_id})
        if(zone){
            req._id = _id
            req.zone=zone
            next()
        }else{
            res.status(404).json("Zone not Found")
        }
   }catch(e){
    res.status(404).json("invalid Id")
    console.log(e);
   }
}

module.exports = {checkIfZoneExist}