const cookieParser = require('cookie-parser')
const express = require('express')
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

app.use(express.json())
app.use(cookieParser())
app.use('/', routes)

app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || "Error Occured, Pleace try again."
  return res.status(status).json({
    success: false,
    status,
    message
  })
})


