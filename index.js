require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000
const session = require('express-session')
const authRoutes= require('./routes/auth')

require('./models')

app.use(express.json())

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
})
)

app.use('/auth',authRoutes)

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})