const conn = require("../database/database")

const connetLogin = (req,res,next) => {
    const {userId, userPw} = req.body;
    const sql = `SELECT * FROM user WHERE userId = "${userId}" AND "${userPw}"`

    conn.query(sql, function (err,rows){
        if(err){
            return res.status(500).send({
                "message" : "서버 연결에 실패하였습니다."
            })
        }
        if (rows.length <= 0) {
            return res.status(403).send({ 
                "message": "아이디와 비밀번호가 일치하지 않습니다."
            })
        }

        next()
    })
}



module.exports = connetLogin