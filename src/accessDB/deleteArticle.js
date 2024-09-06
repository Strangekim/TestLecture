const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const deleteArticle = async (req,res,next) => {
    const {articleidx} = req.params
    const {useridx} = req.session

    const sql = `DELETE FROM Article.article WHERE useridx = $1 AND articleidx = $2`;

    try{
        const result = await client.query(sql, [useridx,articleidx])
        next()
    } catch(e) {
        next(e)
    }
}

module.exports = deleteArticle