const express = require('express')
const app = express()
const port = 5000


app.use(express.json())

require('./models')

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})