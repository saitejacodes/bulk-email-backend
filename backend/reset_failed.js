const mongoose = require('mongoose')
require('dotenv').config()
const Email = require('./src/models/email')

async function resetFailed() {
    await mongoose.connect(process.env.MONGO_URI)
    const result = await Email.updateMany({ status: 'failed' }, { status: 'pending', lastError: null })
    console.log(`Reset ${result.modifiedCount} failed emails to pending.`)
    process.exit()
}

resetFailed()
