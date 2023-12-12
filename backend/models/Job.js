const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    id: {
        type: Number,
        // required: true
    },
    description:{
        type:String,
        required: true
    },
    bids:{
        type: Map,
        default: {}
    },
    numBids:{
        type:Number,
        default: 0
    },
    expiry:{
        type: Date,
        required: true
    },
}, {timestamps: true})

//make a model out of the schema
module.exports = mongoose.model('job', jobSchema)