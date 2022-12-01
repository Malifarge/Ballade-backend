const express = require('express')
const app = express()
const bcrypt =require("bcrypt")
const issueToken = require('../utils/jwt')
const Users = require('../models/Users')

app.post('/login', async(req,res)=>{

    const {Email,Password} =req.body

    const user = await Users.findOne({
        Email
    })


    if(!user){
        res.status(404).send('User Not Found')
    }else{

        const validPassword = await bcrypt.compare(Password, user.Password)

        if (validPassword) {
            const token = issueToken({_id: user._id, Email: user.Email})

            res.json({
                token
            })
        } else {
            res.status(404).send('Wrong Password')
        }
    }
})

app.post('/signup',   async (req,res)=>{
    const {Pseudo,Email,Password} =req.body

    const hashedPassword = await bcrypt.hash(Password, 10)

    const user = await Users.create({
        Pseudo,
        Role: 'Connected',
        Email,
        Password: hashedPassword
    })

    res.json({
        user
    })
})

module.exports= app