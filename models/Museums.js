const mongoose = require ('mongoose')

const MuseumSchema = new mongoose.Schema(
    {
        url: String,
        mots: Array,
        Description: Object,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        } 
    },
    {
        timestamps: true
    }
)

const Museum = mongoose.model('Museum',MuseumSchema)

module.exports = Museum