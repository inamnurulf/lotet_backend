const mongoose = require('mongoose')

const seminarSchema = new mongoose.Schema({
    
    // input model here
    name:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    eventTime:{
        type: Date,
        required: true,
    },
    category:[{
        type: String,
        required: false,
    }]

}, {timestamps: true})

module.exports = mongoose.model('Seminar', seminarSchema)