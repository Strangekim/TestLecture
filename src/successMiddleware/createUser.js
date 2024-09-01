const conn = require("../database/database")

const createUser = (req,res,next) => {
    const {userId, userPw, userName, userPhone, userGrade} = req.body;

    const sql = `INSERT INTO user (userId, userPw, userName, userGrade, userPhone) VALUES (?,?,?,?,?)`;

    conn.query(sql,[userId, userPw, userName, userGrade, userPhone] ,function (err,result){
        if(err){
            return res.status(500).send({
                "message" : "DB 서버 연결에 실패하였습니다."
            })
        }
        next()
    })
}

module.exports = createUser