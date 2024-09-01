const conn = require("../database/database")

const notFoundCategory = (req,res,next) => {
    const {categoryIdx} = req.query
    const sql = `SELECT * FROM category WHERE categoryIdx = ?`

    conn.query(sql, [categoryIdx],function (err,row){
        if(err){
            return res.status(500).send({
                "message" : "서버 연결에 실패하였습니다."
            })
        }
        if (row.length == 0) {
            return res.status(404).send({ 
                "message": "존재하지 않는 게시판 종류 입니다."
            })
        }
        next()
    })
}



module.exports = notFoundCategory