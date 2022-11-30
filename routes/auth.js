const express = require('express')
const app = express()
const bcrypt =require("bcrypt")
const issueToken = require('../utils/jwt')
const Users = require('../models/Users')

app.post('/login', async (req,res)=>{

    const {Email,Password} =req.body

    const user = await Users.findOne({
        where:{
            Email
        }
    })

    if(!user){
        res.status(404).send('Not Found')
    }else{
        const validPassword = await bcrypt.compare(Password, user.Password)

        if (validPassword) {
            const token = issueToken({_id: user._id, Email: user.Email, Role: user.Role})

            res.json({
                token
            })
        } else {
            res.status(404).send('Not found')
        }
    }
})

app.post('/signup',   async (req,res)=>{
    const {Pseudo,Role,Email,Password} =req.body

    const hashedPassword = await bcrypt.hash(Password, 10)

    const user = await Users.create({
        Pseudo,
        Role,
        Email,
        Password: hashedPassword
    })

    res.json({
        user
    })
})

module.exports= app