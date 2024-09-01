const conn = require("../database/database")

const createArticleLike = (req,res,next) => {
    const {articleIdx} = req.params
    const {userIdx} = req.session

    const sql = `INSERT INTO articleLike (articleIdx, userIdx) VALUES (?,?)`;

    conn.query(sql,[articleIdx, userIdx] ,function (err,result){
        if(err){
            return res.status(500).send({
                "message" : "DB 서버 연결에 실패하였습니다."
            })
        }
        next()
    })
}

module.exports = createArticleLike