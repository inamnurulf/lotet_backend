require('dotenv').config()
const initDB = require('./src/lib/db')

const kerjaPraktikRoute =require('./src/routes/kerjaPraktik')
const seminarRoute =require('./src/routes/seminar')
const userRoute = require('./src/routes/user')
const customRoute = require('./src/routes/custom')

const cors = require('cors')
const express = require('express')
const app = express()
const port = 3001

const db = initDB()
app.use(express.json())

app.use(cors())
app.options('*', cors());


// app.listen(port, () => {
//   console.log(`Server is running on port : ${port}`)
// })
app.use('/kerjaPraktik', kerjaPraktikRoute)
app.use('/seminar', seminarRoute)
app.use('/custom', customRoute)
app.use('/user', userRoute)

export default app;