const conn = require("../database/database")

const createComment = (req,res,next) => {
    const {articleIdx,commentContent} = req.body
    const {userIdx} = req.session

    const sql = `INSERT INTO comment (articleIdx, userIdx, commentContent) VALUES (?,?,?)`;

    conn.query(sql,[articleIdx, userIdx, commentContent] ,function (err,result){
        if(err){
            return res.status(404).send({
                "message" : "존재하지 않는 게시글 입니다."
            })
        }
        next()
    })
}

module.exports = createComment