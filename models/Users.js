const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema(
    {
        Pseudo: String,
        Role: String,
        Email: {
            type: String,
            unique: true,
            required: true
        },
        Password: String

    },
    {
        timestamps: true
    }
)

const Users = mongoose.model('Users',UsersSchema)

module.exports= Users