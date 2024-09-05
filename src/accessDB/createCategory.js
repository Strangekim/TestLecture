const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const createCategory = async (req,res,next) => {
    const {categoryname} = req.body
    const sql = 'INSERT INTO Article.category (categoryname) VALUES ($1)'

    try{
        const result = await client.query(sql, [categoryname])
        next()
    } catch(e){
        next(e)
    }
}


module.exports = createCategory