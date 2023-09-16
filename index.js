require('dotenv').config()
const initDB = require('./src/lib/db')

const kerjaPraktikRoute =require('./src/routes/kerjaPraktik')
const seminarRoute =require('./src/routes/seminar')

const express = require('express')
const app = express()
const port = 3000

const db = initDB()
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`)
})
app.use('/kerjaPraktik', kerjaPraktikRoute)
app.use('/seminar', seminarRoute)