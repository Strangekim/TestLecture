const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const checkArticleConflict =  async (req,res,next) => {
        const {articleidx} = req.params
        const {useridx} = req.session

        const sql = `SELECT * FROM Article.article WHERE articleidx = $1 AND useridx = $2`

        try{
            const result = await client.query(sql, [articleidx,useridx])
            if(!result.rows[0]) throw customError(404, `올바르지 않은 게시글 입니다.`)
            next()
        } catch(e) {
            next(e)
        }
    }

module.exports = checkArticleConflict