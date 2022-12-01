require("dotenv").config()

const mongoose = require('mongoose')

require('./Users')
require('./Avatars')


const connectDb = () =>{
    
    mongoose.connect(`mongodb://${process.env.URL}:${process.env.PORT}/Ballade_db`)

    const db = mongoose.connection

    db.on('error', () => {
      console.log('error')
    })
  
    db.once('open', () => {
      console.log('connected to db')
    })
  }

connectDb()
