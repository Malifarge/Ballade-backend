const mongoose = require ('mongoose')

const ZonesSchema = new mongoose.Schema(
    {
        terrain: String,
        Form:Object,
        mots: Array,
        découverte:Boolean,
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

const Zones = mongoose.model('Zones',ZonesSchema)

module.exports = Zones