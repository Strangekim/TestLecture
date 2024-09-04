const conn = require("../database/postgreSQL")

const conflictError = (check) => {
    return (req,res,next) => {
        const value = req.body[check]
        const sql = `SELECT * FROM user WHERE ${check} = ?`

        conn.query(sql, [value],function (err,rows){
            if(err){
                return res.status(500).send({
                    "message" : "DB서버 연결에 실패하였습니다."
                })
            }
            if (rows.length > 0) {
                return res.status(409).send({ 
                    "message": `중복된 ${check} 입니다.`
                })
            }
            if(rows.length == 0){
                next()
            }
        })
    }
}

module.exports = conflictError