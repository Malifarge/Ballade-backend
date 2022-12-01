const express = require("express")
const bcrypt =require("bcrypt")
const app = express()
const mongoose = require("mongoose")
const passport = require("../config/passport")
const Users = require("../models/Users")
const Avatars = require("../models/Avatars")

app.get('/me',passport.authenticate('jwt'), (req,res)=>{
    res.send(req.user)
})

app.get('/', async (req,res)=>{
    const users = await Users.find()
    res.json(users)
})

app.put('/:id', async (req,res)=>{
    const _id = mongoose.Types.ObjectId(req.params)
    const {Pseudo,Email,Password} = req.body
    const hashedPassword = await bcrypt.hash(Password, 10)
    await Users.updateOne(
        {_id},
        {
            Pseudo,
            Email,
            Password:hashedPassword
        }
    )

    res.status(200).json('ok')
    
})

app.delete('/:id', async (req,res)=>{
    const _id = mongoose.Types.ObjectId(req.params)
    await Users.deleteOne(
        {_id}
    )
    
    await Avatars.deleteOne({
        user_id: _id
    })

    res.json('User deleted')
})

module.exports = app