const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })
const sendRoutes = require('./routes/send')
const app = express()
const PORT = process.env.PORT || 3000

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use(express.json())
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected')
}).catch(err => {
    console.log('db error', err)
})
app.get('/health', (req, res) => {
    res.json({ status: 'ok', server: 'running' })
})
app.use('/', sendRoutes)
app.listen(PORT, () => {
    console.log('running on' + PORT)
})
