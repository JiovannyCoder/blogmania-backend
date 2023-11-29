require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')

// mongoose
const mongoose = require('mongoose')

// express app
const app = express()

// cors config
const corsOptions = {
    origins: ['http://localhost:5173', 'http://localhost:3000']
}

// middlewares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

/* APP ROUTES */
app.get('/', (req, res) => {
    res.json({ message: "Welcome to blog Mania !" })
})

/* API ROUTES */
app.use('/api/user', userRoutes)


// DB conncetion
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('The App is open running on port :', process.env.PORT))
    })
    .catch(err => console.log(err))