const conn = require("../database/postgreSQL")

const notFoundPhoneName = (req,res,next) => {
    const {userPhone, userName} = req.body
    const sql = `SELECT userPw FROM user WHERE userPhone = ? AND userName = ?`;

    conn.query(sql, [userPhone, userName],function (err,rows){
        if(err){
            return res.status(500).send({
                "message" : "DB서버 연결에 실패하였습니다."
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



module.exports = notFoundPhoneName