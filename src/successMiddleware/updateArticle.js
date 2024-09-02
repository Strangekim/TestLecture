const conn = require("../database/database")

const updateArticle = (req,res,next) => {
    const {articleIdx} = req.params;
    const {userIdx} = req.session;
    const {categoryIdx, articleTitle, articleContent} = req.body;

    const sql = `UPDATE article SET categoryIdx = ?, articleTitle =?, articleContent = ? WHERE userIdx = ? AND articleIdx = ?`;

    conn.query(sql,[categoryIdx, articleTitle, articleContent, userIdx, articleIdx] ,function (err,row){
        if(err){
            return res.status(500).send({
                "message" : err.message
            })
        }
        next()
    })
}

module.exports = updateArticle