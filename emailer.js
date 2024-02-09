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
  from: 'youremail@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'mass text check'
};

function sendEmail() {
    mailOptions.bcc = require('./recipients.json').recipients
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
