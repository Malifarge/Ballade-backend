require("dotenv").config()

const mongoose = require('mongoose')

const connectDb = () =>{
    
    mongoose.connect(`mongodb://${process.env.URL}:${process.env.PORT}/Ballade`)

    const db = mongoose.connection

    db.on('error', () => {
        console.log('error')
      })

    db.once('open', ()=>{
        console.log('Connected to db');
})
}

connectDb()
