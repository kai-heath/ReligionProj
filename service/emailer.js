const gmailConfig = require("./gmailConfig.json");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "wordsofchristproject@gmail.com",
    pass: gmailConfig.password
  },
});

const mailOptions = {
  from: 'wordsofchristproject@gmail.com',
};

function sendEmail(recipient, subject, text) {
    mailOptions.to = recipient
    mailOptions.subject = subject
    mailOptions.text = text
    transporter.sendMail(mailOptions)
        .then((info) => {
            console.log(`Message sent: ${info.response}`);
        }, (err) => {
            console.log(`Error occurred: ${err}`);
        })
    ;
}

module.exports = {
    sendEmail,
}
