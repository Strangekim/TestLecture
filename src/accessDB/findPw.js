const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const findPw = async (req,res,next) => {
    const {userPhone, userName} = req.body
    const sql = `SELECT userPw FROM Account.user WHERE userPhone = $1 AND userName = $2`

    try{
        const result = await client.query(sql, [userPhone,userName])
        if(!result.rows[0]) throw customError (404, "전화번호가 존재하지 않습니다.")
        if(result.rows[0]) {
            return res.status(200).send({
                "message" : result.rows[0].userpw
            })
        } 
        next()
    } catch(e){
        next(e)
    }

}

module.exports = findPw