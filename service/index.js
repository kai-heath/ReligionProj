const express = require('express');
const app = express();
const mailer = require('./emailer.js')
const sqlite3 = require('sqlite3');
const port = 3001
app.use(express.json())
app.use(express.static('public'));
const db = require ('./db')
var cors = require('cors')



const apiRouter = express.Router();
app.use(`/api`, apiRouter);

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
  

apiRouter.get('/sendMail', async (req, res) => {
    console.log('heelo')
    res.send('yeet')
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
    console.log(outString)
    res.send(outString)
})


app.listen(port,()=>console.log("running at port " + port));