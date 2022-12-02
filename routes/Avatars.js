const express = require("express");
const { checkIfAvatarExist } = require("../middleware/Avatars");
const { checkIfUserExist } = require("../middleware/User");
const Avatars = require("../models/Avatars");
const app = express()

app.get('/', async (req,res)=>{
    const avatars = await Avatars.find()
    res.json(avatars)
})

app.get('/:id',checkIfAvatarExist, async (req,res)=>{
    const {_id} = req
    const avatar = await Avatars.findOne({
        _id
    })

    res.json(avatar)
})

app.post('/:id',checkIfUserExist, async (req,res)=>{
    const {Form} = req.body
    const user_id = req._id
    const avatar = await Avatars.create({
        Form,
        user_id
    })

    res.json(avatar)
})

app.put('/:id',checkIfAvatarExist, async (req,res)=>{
    const {Form} = req.body
    const {_id} = req
    await Avatars.updateOne(
        {_id}, {Form}
    )

    res.status(200).json('ok')
})

module.exports = app