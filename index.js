require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000
const session = require('express-session')
const authRoutes= require('./routes/auth')
const UsersRoutes = require('./routes/Users')
const AvatarsRoutes = require('./routes/Avatars')
const MuseumsRoutes = require('./routes/Museum')
const ZonesRoutes = require('./routes/Zones')

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
app.use('/users',UsersRoutes)
app.use('/avatars',AvatarsRoutes)
app.use('/museums',MuseumsRoutes)
app.use('/zones',ZonesRoutes)

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})