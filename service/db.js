const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const filepath = "./recipients.db";
const database = createDbConnection()

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    }
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
            return console.error(error.message);
        }
        createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
}

function createTable(db) {
    db.exec(`
  CREATE TABLE Emails
  (
    Email   VARCHAR(50) NOT NULL PRIMARY KEY
  );
`);
}

function insertData(email) {
    return new Promise((resolve, reject) => {
        return database.run(
            `INSERT INTO Emails (Email) VALUES (?)`,
            [email],
            function (error) {
                if (error) {
                    return reject(error.message);
                }
                return resolve(true);
            }
        );
    })
}

function displayData() {
    database.each(`SELECT * FROM Emails`, (error, row) => {
        if (error) {
            console.log(error.message);
        }
        console.log(row);
    });
}

 function isInDb(email) {
    return new Promise ((resolve, reject) => {
        return database.get(
            'SELECT Email FROM Emails Where Email = (?)', [email], (error, output) => {
                if (error) {
                    return reject(error.message)
                }
                if (output) {
                    return resolve(true)
                }
                return resolve(false)
            } )
    })
}

function deleteData(email) {
    return new Promise((resolve, reject) => {
        return database.run(
            'DELETE FROM Emails WHERE Email = (?)', [email], (error, output) => {
                if (error) {
                    return reject(error.message)
                }
                return resolve(true)
            }
        )
    })

}

module.exports = {
    insertData,
    displayData,
    isInDb,
    deleteData
}
