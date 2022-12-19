const express = require("express")
const app = express()
const passport = require("../config/passport")
const Users = require("../models/Users")
const Avatars = require("../models/Avatars")
const Zones = require("../models/Zones")
const Museum = require("../models/Museums")
const {checkIfUserExist} = require("../middleware/User")

app.get('/me',passport.authenticate('jwt'), (req,res)=>{
    res.send(req.user)
})

app.get('/', async (req,res)=>{
    const users = await Users.find()
    res.json(users)
})

app.put('/:id',checkIfUserExist, async (req,res)=>{
    const {newUser,_id} = req
    await Users.updateOne(
        {_id},newUser
    )

    res.status(200).json('ok')
    
})

app.delete('/:id',checkIfUserExist, async (req,res)=>{
    const {_id} = req
    await Users.deleteOne(
        {_id}
    )
    
    await Avatars.deleteOne({
        user_id: _id
    })

    await Museum.deleteMany({
        user_id: _id
    })

    await Zones.deleteMany({
        user_id: _id
    })

    res.json('User deleted')
})

module.exports = app