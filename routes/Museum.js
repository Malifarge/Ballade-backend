const express = require('express')
const { checkIfMuseumExist } = require('../middleware/Museum')
const { checkIfUserExist } = require('../middleware/User')
const Museums = require('../models/Museums')
const app = express()

app.get('/', async (req,res)=>{
    const museum = await Museums.find()
    res.json(museum)
})

app.get('/:id',checkIfMuseumExist, async (req,res)=>{
    const {museum} = req
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
    await Museums.updateOne(
        {_id}, {Description}
    )

    res.status(200).json('ok')
})

app.delete('/:id',checkIfMuseumExist, async (req,res)=>{
    const {_id} = req
    await Museums.deleteOne(
        {_id}
    )
})

module.exports = app