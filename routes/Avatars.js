const express = require("express");
const mongoose = require("mongoose")
const Avatars = require("../models/Avatars");
const app = express()

app.get('/', async (req,res)=>{
    const avatars = await Avatars.find()
    res.json(avatars)
})

app.get('/:id', async (req,res)=>{
    const _id = mongoose.Types.ObjectId(req.params);
    const avatar = await Avatars.findOne({
        _id
    })

    res.json(avatar)
})

app.post('/:id', async (req,res)=>{
    const {Form} = req.body
    const user_id = mongoose.Types.ObjectId(req.params);
    const avatar = await Avatars.create({
        Form,
        user_id
    })

    res.json(avatar)
})

app.put('/:id', async (req,res)=>{
    const {Form} = req.body
    const _id = mongoose.Types.ObjectId(req.params);
    const newAvatar = await Avatars.updateOne(
        {_id}, {Form}
    )

    res.json(newAvatar)
})

module.exports = app