const client = require("../../../database/postgreSQL")
const customError = require("../../../Module/customError")

const checkDuplication = (q,check) => {
    return async (req,res,next) => {
        const value = req.body[check]
        const sql = `SELECT * FROM ${q} WHERE ${check} = $1`

        try{
            const result = await client.query(sql, [value])
            if(result.rows[0]) throw customError(409, `중복된 ${check} 입니다.`)
            next()
        } catch(e) {
            next(e)
        }
    }
}

const checkConflict = (q, check) => {
    return async (req,res,next) => {
        const value = req.params[check] || req.query[check] || req.body[check]
        const {useridx} = req.session

        const sql = `SELECT * FROM ${q} WHERE ${check} = $1 AND useridx = $2`

        try{
            const result = await client.query(sql, [value,useridx])
            if(!result.rows[0]) throw customError(404, `올바르지 않은 ${check} 입니다.`)
            next()
        } catch(e) {
            next(e)
        }
    }
}


module.exports = {checkConflict,checkDuplication}