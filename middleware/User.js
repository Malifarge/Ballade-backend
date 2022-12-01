const mongoose = require("mongoose")
const bcrypt =require("bcrypt")
const Users = require("../models/Users")

const checkIfUserExist = async (req,res,next) =>{
    try{
        const _id = mongoose.Types.ObjectId(req.params)
        const user = await Users.findOne({_id})
        const {Pseudo,Email,Password} = req.body
        const hashedPassword = await bcrypt.hash(Password, 10)
        if (user){
            req.newUser = {
                Pseudo,
                Email,
                Password: hashedPassword
            }
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

module.exports = {checkIfUserExist}