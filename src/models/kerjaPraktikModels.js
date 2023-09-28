const mongoose = require('mongoose')

const Schema = mongoose.Schema
const kerjaPraktikSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    details: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: false
    }]
}, { timestamps: true })
module.exports = mongoose.model('kerjaPraktik', kerjaPraktikSchema)
