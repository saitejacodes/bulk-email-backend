const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err))

const emailRoutes = require('./src/routes/send')
app.use('/', emailRoutes)

require('./src/worker')

app.use('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`)
})
