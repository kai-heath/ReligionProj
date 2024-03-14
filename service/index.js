const express = require('express');
const app = express();
const mailer = require('./emailer.js')
const sqlite3 = require('sqlite3');
const port = 3001
app.use(express.json())
app.use(express.static('public'));
const db = require ('./db')
var cors = require('cors')
const uuid = require('uuid');
const schedule = require('node-schedule');



const apiRouter = express.Router();
app.use(cors());
app.use(`/api`, apiRouter);

apiRouter.get('/sendMail', async (req, res) => {
    console.log('heelo')
    res.send('yeet')
})

apiRouter.post('/addEmail', async (req, res) => {
    let outString = ""
    let phone = req.body.email
    let token = uuid.v1()
    try {
        await db.insertData(phone, token)
        await mailer.sendEmail(phone, "Thank you for signing up to Words of Christ! \n want to unsubscribe? click the following link.")
        await mailer.sendEmail(phone, "http://localhost:3001/deleteAccount/" + token)
        outString = `successfully added ${phone}`
    }
    catch(message) {
        outString = message
    }
    console.log(outString)
    res.send(outString)
})

apiRouter.get('/deleteAccount/:token', async (req, res) => {
    let phone = await db.getPhone(req.params.token)
    db.deleteData(req.params.token)
    res.redirect("http://localhost:3000/wordsOfChrist/deleteAccount/?token=" + phone)
})

const job = schedule.scheduleJob('*/5 * * * * *', async function(){
    console.log('running job')
    accounts = await db.getPhoneNumbers();
    accounts.forEach(async (account) => {
        //await mailer.sendEmail(account.Phone, "Here's your daily verse!")
        console.log(account.Phone)
    })
  });


app.listen(port,()=>console.log("running at port " + port));