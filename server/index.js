const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.LOCAL_HOST

app.listen(PORT, () => {
  console.log("connected to server")
})

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.get('/', (req, res) => {
  res.json("Hello World")
})


