const client = require("../../../database/postgreSQL")
const customError = require("../../../Module/customError")

const notFoundInformation = (q,input) => {
    return async (req,res,next) => {
        const value = req.body[input] || req.params[input] || req.query[input] || req.session[input]
        const sql = `SELECT * FROM ${q} WHERE ${input} = $1`

        try{
            const result = await client.query(sql, [value])
            if(!result.rows[0]) throw customError(404, `${input}가 존재하지 않습니다.`)
            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = {notFoundInformation}