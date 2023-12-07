require('dotenv').config()
const initDB = require('./src/lib/db')

const kerjaPraktikRoute =require('./src/routes/kerjaPraktik')
const seminarRoute =require('./src/routes/seminar')
const userRoute = require('./src/routes/user')
const customRoute = require('./src/routes/custom')
const bodyParser = require('body-parser')


const app = express()
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
const port = 5000

const db = initDB()

app.use(cors())
app.options('*', cors());
app.use(express.limit(100000000));
app.use(express.json())

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


// app.listen(port, () => {
//   console.log(`Server is running on port : ${port}`)
// })
app.use('/kerjaPraktik', kerjaPraktikRoute)
app.use('/seminar', seminarRoute)
app.use('/custom', customRoute)
app.use('/user', userRoute)

export default app;