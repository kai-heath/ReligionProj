const express = require('express');
const app = express();
const mailer = require('./emailer.js')

const port = 3000
app.use(express.json())
app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/sendMail', async (req, res) => {
    res.send('yeet')
    mailer.sendEmail()
    console.log('hello')
})

apiRouter.post('/addEmail', (req, res) => {
    let recipients = require('./recipients.json')
    recipients.recipients = 'hello'
})

app.use((_req, res) => {
    res.sendFile('home.html', { root: 'public' });
});

app.listen(port,()=>console.log("running at 3000 port"));