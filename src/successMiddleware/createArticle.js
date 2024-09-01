const conn = require("../database/database")

const createArticle = (req,res,next) => {
    const {categoryIdx} = req.query
    const {articleTitle, articleContent} = req.body;
    const {userIdx} = req.session
    const sql = `INSERT INTO article (categoryIdx, articleTitle, articleContent, userIdx) VALUES (?,?,?,?)`;

    conn.query(sql,[categoryIdx, articleTitle, articleContent, userIdx] ,function (err,result){
        if(err){
            return res.status(500).send({
                "message" : "DB 서버 연결에 실패하였습니다."
            })
        }
        next()
    })
}

module.exports = createArticle