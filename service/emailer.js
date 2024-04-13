const gmailConfig = require("./gmailConfig.json");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 2525,
  auth: {
    user: "wordsofchristproject@gmail.com",
    pass: gmailConfig.password
  },
});

const mailOptions = {
  from: 'wordsofchristproject@gmail.com',
};

async function sendMassTexts(recipients, text) {
  recipients.forEach(async (recipient) => {
    await sendEmail(recipient, text);
  });
}

async function sendEmail(recipient, text) {
    mailOptions.to = recipient
    mailOptions.text = text
    await transporter.sendMail(mailOptions)
        .then((info) => {
          console.log("sent")
            return (`Message sent: ${info.response}`);
        }, (err) => {
          console.log(err)
            throw (`Error occurred: ${err}`);
        })
}

module.exports = {
    sendEmail,
}
