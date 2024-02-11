db = require('./db.js')
db.displayData()
async function check() {
    let output = await db.insertData('yeetus')
    console.log(await output)
}
check()