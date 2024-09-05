const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const notFoundInformation = (input) => {
    return async (req,res,next) => {
        const value = req.body[input] || req.params[input] || req.query[input] || req.session[input]
        const sql = `SELECT * FROM Account.user WHERE ${input} = $1`
        console.log(value)
        console.log(input)

        try{
            const result = await client.query(sql, [value])
            if(!result.rows[0]) throw customError(404, "계정정보가 존재하지 않습니다.")
            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = notFoundInformation