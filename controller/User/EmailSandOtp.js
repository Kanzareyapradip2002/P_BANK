const nodemailer = require('nodemailer');

async function sendOtp(req, res) {
    const { email,Code} = req.body;
    const otp = Code  

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('OTP sent successfully');
    } catch (error) {
        res.status(500).send('Error sending OTP');
    }
    

}


module.exports = sendOtp
