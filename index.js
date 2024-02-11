const express = require('express');
const app = express();
const mailer = require('./emailer.js')
const sqlite3 = require('sqlite3');
const port = 3000
app.use(express.json())
app.use(express.static('public'));
const db = require ('./db')

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/sendMail', async (req, res) => {
    res.send('yeet')
    mailer.sendEmail()
    console.log('hello')
})

apiRouter.post('/addEmail', async (req, res) => {
    let outString = ""
    let email = req.body.email
    await db.insertData(email)
        .then((result) => {
            outString = `successfully added ${email}!`
        })
        .catch((message) => {
            if (message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Emails.Email") {
                outString = "This email has already been added!"
            }
            else outString = message
        })
    res.send(outString)
})

app.use((_req, res) => {
    res.sendFile('home.html', { root: 'public' });
});

app.listen(port,()=>console.log("running at 3000 port"));