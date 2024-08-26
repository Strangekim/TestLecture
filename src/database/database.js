const maria = require("mysql");

const conn = maria.createConnection({
    host: "localhost",
    port: 3306,
    user: "stageus",
    password: "1234",
    database: "TestLecture"
})

module.exports = conn;