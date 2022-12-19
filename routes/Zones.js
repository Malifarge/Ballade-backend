 const express = require ('express')
const { checkIfUserExist } = require('../middleware/User')
const { checkIfZoneExist } = require('../middleware/Zones')
 const app = express()
 const Zones = require('../models/Zones')

 app.get('/', async (req,res)=>{
    const zones = await Zones.find()
    res.json(zones)
 })

 app.get('/:id',checkIfZoneExist, async (req,res)=>{
    const {zone} = req
    res.json(zone)
 })

 app.post('/:id',checkIfUserExist, async (req,res)=>{
    const{ terrain,Form,mots,découverte,Description} = req.body
    const user_id = req._id
    const zone = await Zones.create({
        terrain,
        Form,
        mots,
        découverte,
        Description,
        user_id
    })

    res.json(zone)
 })

 app.put('/:id',checkIfZoneExist, async (req,res)=>{
   const {Form,Description} = req.body
   const {_id} = req
   await Zones.updateOne(
   {_id},{Description,Form}
   )

   res.status(200).json('ok')
 })

 app.delete('/:id',checkIfZoneExist, async(req,res)=>{
   const {_id} = req
   await Zones.deleteOne(
      {_id}
   )
 })

 module.exports = app