const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const route_v1 = require('./router/v1')
const { validateApiKey } = require('./middleware')

const app = express()

app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    if(req.method !== 'GET') {
        return express.json({ limit: '50mb' })(req, res, next)
    }

    next()
})

app.use(express.urlencoded({ extended: false, limit: '50mb'}))

const port = process.env.PORT || 8080

app.use('/ppdb', validateApiKey, route_v1)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Unknown method'
    })
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})