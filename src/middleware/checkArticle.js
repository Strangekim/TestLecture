const conn = require("../database/database")

const checkArticle = (req,res,next) => {
    const {articleIdx} = req.params;
    const {userIdx} = req.session

    const sql = `SELECT * FROM article WHERE userIdx = ? AND articleIdx = ?`;

    conn.query(sql,[userIdx, articleIdx] ,function (err,row){
        if(err){
            return res.status(500).send({
                "message" : err.message
            })
        }
        if(row.length < 1){
            return res.status(403).send({
                "message" : "본인의 게시글이 아닙니다."
            })           
        }
        next()
    })
}

module.exports = checkArticle