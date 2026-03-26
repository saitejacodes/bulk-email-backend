const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'saitejaveeramalla3@gmail.com',
        pass: 'oyzpocqmwfxykile'
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.error("Local Error:", error);
    } else {
        console.log("Local Server is ready to take our messages");
    }
});
