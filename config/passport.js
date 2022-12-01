require('dotenv').config()

const passport = require('passport')
const { Strategy } = require('passport-jwt')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const Users = require('../models/Users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const strategy = new JwtStrategy(options, async (payload, done)=>{
    const {_id} = payload

    const user = await Users.findOne({
            _id
        })

    if (user){
        return done(null,user)
    }else {
        return done(null,false)
    }

})

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

passport.use(strategy)

module.exports = passport