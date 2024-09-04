const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const notFoundIdx = async (req,res,next) => {
    const {userIdx} = req.session
    const sql = `SELECT * FROM Account.user WHERE userIdx = $1`

    try{
        const result = await client.query(sql, [userIdx])
        if(!result.rows[0]) throw customError(404, "계정정보가 존재하지 않습니다.")
        next()
    } catch (e){
        next(e)
    }
}



module.exports = notFoundIdx