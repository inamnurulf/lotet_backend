require('dotenv').config()
const initDB = require("./src/lib/db")

const express = require('express')
const app = express()
const port = 3000

const db = initDB()

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
