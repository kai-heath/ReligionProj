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
  CREATE TABLE Accounts
  (
    Phone   VARCHAR(50) NOT NULL UNIQUE,
    AuthToken VARCHAR(50) NOT NULL PRIMARY KEY
  );
`);
}

function insertData(email, authToken) {
    return new Promise((resolve, reject) => {
        return database.run(
            `INSERT INTO Accounts (Phone, AuthToken) VALUES (?, ?)`,
            [email, authToken],
            function (error) {
                if (error) {
                    return reject(error.message);
                }
                return resolve(true);
            }
        );
    })
}

async function getPhoneNumbers() {
    return new Promise((resolve, reject) => {
        return database.all(`SELECT * FROM Accounts`, (error, rows) => {
            if (error) {
                return reject(error.message);
            }
            return resolve(rows);
        });
    })
}

 function isInDb(email) {
    return new Promise ((resolve, reject) => {
        return database.get(
            'SELECT Phone FROM Accounts Where Phone = (?)', [email], (error, output) => {
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

function getPhone(authToken) {
    return new Promise((resolve, reject) => {
        return database.get(
            'SELECT Phone FROM Accounts WHERE AuthToken = (?)', [authToken], (error, output) => {
                if (error) {
                    return reject(error.message)
                }
                return resolve(output)
            }
        )
    })
}

function deleteData(authToken) {
    return new Promise((resolve, reject) => {
        return database.run(
            'DELETE FROM Accounts WHERE AuthToken = (?)', [authToken], (error, output) => {
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
    getPhoneNumbers,
    isInDb,
    deleteData,
    getPhone,
}
