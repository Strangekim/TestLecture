const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const conflictError = (check) => {
    return async (req,res,next) => {
        const value = req.body[check]
        const sql = `SELECT * FROM Account.user WHERE ${check} = $1`

        try{
            const result = await client.query(sql, [value])
            if(result.rows[0]) throw customError(409, `중복된 ${check} 입니다.`)
            next()
        } catch(e) {
            next(e)
        }
    }
}

module.exports = conflictError