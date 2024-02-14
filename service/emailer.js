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
  subject: 'Peyton is a turd',
  text: 'Turd'
};

function sendEmail() {
    mailOptions.bcc = "8059561818@vtext.com"
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
