const conn = require("../database/postgreSQL")

const notFoundIdx = (req,res,next) => {
    const {userIdx} = req.session
    const sql = `SELECT * FROM user WHERE userIdx = ?`

    conn.query(sql, [userIdx],function (err,rows){
        if(err){
            return res.status(500).send({
                "message" : "서버 연결에 실패하였습니다."
            })
        }
        if (rows.length <= 0) {
            return res.status(404).send({ 
                "message": "계정정보가 존재하지 않습니다."
            })
        }
        next()
    })
}



module.exports = notFoundIdx