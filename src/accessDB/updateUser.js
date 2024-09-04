const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const updateUser = async (req,res,next) => {
    const {userIdx} = req.session;
    const {userPw, userGrade} = req.body;
    const sql = `UPDATE Account.user SET userpw = $1, Gradeidx = $2 WHERE useridx = $3`;

    try{
        const result = await client.query(sql, [userPw, userGrade, userIdx])
        console.log(result.rowCount)
        if(result.rowCount === 0) throw customError(404, "계정 정보가 존재하지 않습니다.")
        next()
    } catch(e) {
        next(e)
    }
}

module.exports = updateUser