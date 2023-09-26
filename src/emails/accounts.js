const nodemailler = require('nodemailer')

const transporter = nodemailler.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
})

const sendWelcomeMail = async (email, name)=>{
    await transporter.sendMail({
        from: 'kevit.abhishek.vadoliya@mail.com',
        to: email,
        subject: "Welcome to Task App",
        text: `Heyy ${name}, Hope this mail finds you well, welcome to the task app, let us know if you need any assistance`
    });
}
const sendGoodByeMail = async (email, name)=>{
    await transporter.sendMail({
        from: 'kevit.abhishek.vadoliya@mail.com',
        to: email,
        subject: `GoodBye ${name}`,
        text: `Heyy ${name}, Hope this mail finds you well, We regret that you Choose to leave the plateform, can you suggest us anything that could have
        kept you as our customer`
    });
}
module.exports = {
    sendWelcomeMail,
    sendGoodByeMail
}
