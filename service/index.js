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
const scriptures = require('./Scriptures.json')



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
        await mailer.sendEmail(phone, "Thank you for signing up to Words of Christ!")
        //await mailer.sendEmail(phone, "https://kaiheath.com/wordsOfChrist/deleteAccount/?token=" + token)
        outString = `successfully added ${phone.split("@")[0]}`
    }
    catch(message) {
        outString = message
    }
    console.log(outString)
    res.send(outString)
})

apiRouter.get("/getNumberByToken/:token"), async (req, res) => {
    return await db.getPhone(req.params.token)
}

apiRouter.get('/deleteAccount/:token', async (req, res) => {
    let phone = await db.getPhone(req.params.token)
    db.deleteData(req.params.token)
    res.redirect("https://kaiheath.com/wordsOfChrist/deleteAccount/?token=" + phone)
})
let currDay = 6;
const job = schedule.scheduleJob('0 14 * * *', async function(){
    console.log('running job')
    let scripture = scriptures[currDay]
    currDay += 1

    const regex = new RegExp(`.{1,${150}}(\\s|$)`, 'g');
    let verse = scripture.quote.split(regex).filter(Boolean)

    verse = scripture.quote.match(/[\s\S]{1,100}/g) || []
    console.log(verse)
    accounts = await db.getPhoneNumbers();
    accounts.forEach(async (account) => {
        await mailer.sendEmail(account.Phone, "Here's your daily verse!")
        await mailer.sendEmail(account.Phone, scripture.scripture + ":")
        for (i = 0; i < verse.length; i++) {
            await mailer.sendEmail(account.Phone, verse[i])

        }
        console.log(account.Phone)
    })
  });


app.listen(port,()=>console.log("running at port " + port));