require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000
const session = require('express-session')
const authRoutes= require('./routes/auth')
const UsersRoutes = require('./routes/Users')

require('./config/passport')
require('./models')

app.use(express.json())

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
})
)

app.use('/auth',authRoutes)
app.use('/Users',UsersRoutes)

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})