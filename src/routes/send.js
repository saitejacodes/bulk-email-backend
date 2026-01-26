const express = require('express')
const multer = require('multer')
const fs = require('fs')
const Email = require('../models/email')
const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/send', upload.single('csv'), async (req, res) => {
    try {
        const { subject, message } = req.body

        if (!subject || !message || !req.file) {
            return res.status(400).json({ error: 'Please provide subject, message, and CSV file.' })
        }

        const fileContent = fs.readFileSync(req.file.path, 'utf-8')
        const emailList = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.includes('@'))

        if (emailList.length === 0) {
            return res.status(400).json({ error: 'No valid emails found in your file.' })
        }

        const databaseRecords = emailList.map(email => ({
            email: email,
            subject: subject,
            message: message,
            status: 'pending'
        }))

        await Email.insertMany(databaseRecords)

        fs.unlinkSync(req.file.path)

        res.json({ success: true, message: `Successfully queued ${emailList.length} emails!` })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong on the server.' })
    }
})

router.get('/stats', async (req, res) => {
    try {
        const pending = await Email.countDocuments({ status: 'pending' })
        const sent = await Email.countDocuments({ status: 'sent' })
        const failed = await Email.countDocuments({ status: 'failed' })

        res.json({
            pending,
            sent,
            failed,
            total: pending + sent + failed
        })
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch stats.' })
    }
})

router.get('/emails', async (req, res) => {
    try {
        const emails = await Email.find().sort({ createdAt: -1 })
        res.json(emails)
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch email history.' })
    }
})

module.exports = router
