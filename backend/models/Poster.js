const mongoose = require('mongoose')

const Schema = mongoose.Schema

const posterSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    phoneNumber:{
        type:number,
        required: true
    },
    city:{
        type: String,
        required: true
    },  
    jobsPosted:{
        type:[number],
        default: []
    },
}, {timestamps: true})

//make a model out of the schema
module.exports = mongoose.model('poster', posterSchema)