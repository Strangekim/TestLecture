const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const conflictCategoryName = async (req,res,next) => {
        const {categoryName} = req.body
        const sql = `SELECT * FROM Article.category WHERE categoryName = $1`

        try{
            const result = await client.query(sql, [categoryName])
            if(result.rows[0]) throw customError(409, `중복된 카테고리 명 입니다.`)
            next()
        }catch(e){
            next(e)
        }
}

module.exports = conflictCategoryName