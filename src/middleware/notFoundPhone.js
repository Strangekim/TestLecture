const conn = require("../database/database")

const notFoundPhone = (req,res,next) => {
    const {userPhone} = req.body
    const sql = `SELECT userId FROM user WHERE userPhone = ?`

    conn.query(sql, [userPhone],function (err,rows){
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
        return res.status(200).send({
            "message" : rows
        })
        next()
    })
}



module.exports = notFoundPhone