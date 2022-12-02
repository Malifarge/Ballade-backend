const express = require('express')
const { checkIfMuseumExist } = require('../middleware/Museum')
const { checkIfUserExist } = require('../middleware/User')
const Museum = require('../models/Museum')
const app = express()

app.get('/', async (req,res)=>{
    const museum = await Museum.find()
    res.json(museum)
})

app.get('/:id',checkIfMuseumExist, async (req,res)=>{
    const {_id} = req
    const museum = await Museum.findOne({
        _id
    })

    res.json(museum)
})

app.post('/:id',checkIfUserExist, async (req,res)=>{
    const {url, mots,Description} = req.body
    const user_id = req._id
    const museum = await Museums.create({
        url,
        mots,
        Description,
        user_id
    })

    res.json(museum)
})

app.put('/:id',checkIfMuseumExist, async (req,res)=>{
    const {Description} = req.body
    const {_id} = req
    await Museum.updateOne(
        {_id}, {Description}
    )

    res.status(200).json('ok')
})

app.delete('/:id',checkIfMuseumExist, async (req,res)=>{
    const _id = req._id
    await Museum.deleteOne(
        {_id}
    )
})

module.exports = app