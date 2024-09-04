const conn = require("../database/postgreSQL")

const deleteArticle = (req,res,next) => {
    const {articleIdx} = req.params;
    const {userIdx} = req.session

    const sql = `DELETE FROM article WHERE userIdx = ? AND articleIdx = ?`;

    conn.query(sql,[userIdx, articleIdx] ,function (err,row){
        if(err){
            return res.status(500).send({
                "message" : "DB 서버 에러"
            })
        }
        next()
    })
}

module.exports = deleteArticle