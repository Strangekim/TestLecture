const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const checkArticleLike =  async (req,res,next) => {
        const {articleidx} = req.params
        const {useridx} = req.decoded

        const sql = `SELECT * FROM Article.articleLike WHERE articleidx = $1 AND useridx = $2`

        try{
            const result = await client.query(sql, [articleidx,useridx])
            if(result.rows[0]) throw customError(409, `중복된 요청입니다.`)
            next()
        } catch(e) {
            next(e)
        }
}

const checkNotArticleLike =  async (req,res,next) => {
    const {articleidx} = req.params
    const {useridx} = req.decoded

    const sql = `SELECT * FROM Article.articleLike WHERE articleidx = $1 AND useridx = $2`

    try{
        const result = await client.query(sql, [articleidx,useridx])
        if(!result.rows[0]) throw customError(409, `중복된 요청입니다.`)
        next()
    } catch(e) {
        next(e)
    }
}


const checkCommentLike =  async (req,res,next) => {
    const {commentidx} = req.params
    const {useridx} = req.decoded

    const sql = `SELECT * FROM Comment.commentLike WHERE commentidx = $1 AND useridx = $2`

    try{
        const result = await client.query(sql, [commentidx,useridx])
        if(result.rows[0]) throw customError(409, `중복된 요청입니다.`)
        next()
    } catch(e) {
        next(e)
    }
} 

const checkNotCommentLike =  async (req,res,next) => {
    const {commentidx} = req.params
    const {useridx} = req.decoded

    const sql = `SELECT * FROM Comment.commentLike WHERE commentidx = $1 AND useridx = $2`

    try{
        const result = await client.query(sql, [commentidx,useridx])
        if(!result.rows[0]) throw customError(409, `중복된 요청입니다.`)
        next()
    } catch(e) {
        next(e)
    }
} 

module.exports = {checkArticleLike,checkCommentLike,checkNotCommentLike,checkNotArticleLike}