const client = require("../../database/postgreSQL")
const customError = require("../../Module/customError")

const checkArticleLike =  async (req,res,next) => {
        const {articleidx} = req.params
        const {useridx} = req.session

        const sql = `SELECT * FROM Article.articleLike WHERE articleidx = $1 AND useridx = $2`

        try{
            const result = await client.query(sql, [articleidx,useridx])
            if(result.rows[0]) throw customError(409, `중복된 좋아요 요청입니다.`)
            next()
        } catch(e) {
            next(e)
        }
    }

const checkArticleNotLike =  async (req,res,next) => {
    const {articleidx} = req.params
    const {useridx} = req.session

    const sql = `SELECT * FROM Article.articleLike WHERE articleidx = $1 AND useridx = $2`

    try{
        const result = await client.query(sql, [articleidx,useridx])
        if(!result.rows[0]) throw customError(409, `중복된 좋아요 삭제 요청입니다.`)
        next()
    } catch(e) {
        next(e)
    }
}

module.exports = {checkArticleLike,checkArticleNotLike}