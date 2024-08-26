const router = require("express").Router()
const path = require('path')
const mariadb = require("../database/database")

const conn = require("../database/database")

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../page/home.html"));
});

router.get("/test", function(req,res) {
    var sql = "SELECT * FROM user"
    conn.query(sql, function(err,rows){
        if(err){
            res.status(500).send("서버 에러")
        }
        res.send({
            "rows" : rows
        })
    })
})


module.exports = router