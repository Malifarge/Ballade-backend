const jwt = require("jsonwebtoken")
require('dotenv').config()

const issueToken= user =>{
    const token = jwt.sign(user,process.env.JWT_SECRET)

    return token
}

module.exports = issueToken