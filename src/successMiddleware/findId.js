const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const findId = async (req,res,next) => {
    const {userPhone} = req.body
    const sql = `SELECT userid FROM Account.user WHERE userphone = $1`

    try{
        const result = await client.query(sql, [userPhone])
        if(!result.rows[0]) throw customError (404, "전화번호가 존재하지 않습니다.")
        if(result.rows[0]) {
            return res.status(200).send({
                "message" : result.rows[0].userid
            })
        } 
        next()
    } catch(e){
        next(e)
    }

}

module.exports = findId