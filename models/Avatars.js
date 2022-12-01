const mongoose = require('mongoose')

const AvatarsSchema = new mongoose.Schema(
    {
        Form: Object,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        } 

    },
    {
        timestamps: true
    }
)

const Avatars = mongoose.model('Avatars',AvatarsSchema)

module.exports= Avatars