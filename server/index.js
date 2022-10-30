const express = require('express')
const router = express.Router()
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const routes = require('./api/routes')

const PORT = process.env.LOCAL_HOST
const DB = process.env.MONGODB_URL

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to mongoDB")
    app.listen(PORT, () => {
      console.log(`connected to server: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message)
  })



app.get('/', (req, res) => {
  res.send("Hello World")
})

router.use('/', routes)



