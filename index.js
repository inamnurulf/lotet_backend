require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(process.env.DATABASE_URL, options)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to db'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 