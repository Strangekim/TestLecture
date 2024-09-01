const conn = require("../database/database")

const getArticle = (req,res,next) => {
    const {categoryIdx} = req.query;

    const sql = `SELECT * FROM article WHERE categoryIdx = ?`;

    conn.query(sql,[categoryIdx] ,function (err,rows){
        if(err){
            return res.status(500).send({
                "message" : "DB 서버 연결에 실패하였습니다."
            })
        }
        res.status(200).send({
            "message" : rows
        })
        next()
    })
}

module.exports = getArticle