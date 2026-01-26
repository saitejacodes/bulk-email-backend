const nodemailer = require('nodemailer')
const Email = require('./models/email')

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const sendPendingEmails = async () => {
    try {
        const emailsToSend = await Email.find({ status: 'pending' }).limit(5)

        if (emailsToSend.length === 0) return

        for (let item of emailsToSend) {
            try {
                await transporter.sendMail({
                    from: process.env.FROM_EMAIL,
                    to: item.email,
                    subject: item.subject,
                    text: item.message
                })

                item.status = 'sent'
                item.sentAt = new Date()

            } catch (sendError) {
                item.status = 'failed'
                item.lastError = sendError.message
            }

            await item.save()
        }

    } catch (dbError) {
        console.error(dbError.message)
    }
}

setInterval(sendPendingEmails, 10000)
