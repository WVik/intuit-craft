require('dotenv').config()

const jobRoutes = require('./routes/jobRoutes')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use('/api/jobs', jobRoutes)
app.use((req, res, next) => {
    console.log(req.path, req.method)
    console.log(req.body)
    next()
  })

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to DB. Listening on port ", process.env.PORT)
 
        app.listen(process.env.PORT, () => {
            console.log("Listening on 4000")
        })
    })
    .catch((error) => {
        console.log("Error: ", error)
    })