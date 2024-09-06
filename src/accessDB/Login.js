const client = require("../database/postgreSQL")
const customError = require("../Module/customError")


const Login = async (req,res,next) => {
    const {userid, userpw} = req.body;
    const sql = `SELECT * FROM Account.user WHERE userid = $1 AND userpw = $2`

    try{
    const result = await client.query(sql, [userid,userpw])

    if(!result.rows[0]) throw customError(403, "아이디와 비밀번호가 일치하지 않습니다.")

    next()
    } catch (e) {
        next(e)
    }
}


module.exports = Login