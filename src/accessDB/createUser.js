const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const createUser = async (req,res,next) => {
    const {userId, userPw, userName, userPhone, userGrade} = req.body;
    const sql = `INSERT INTO Account.user (userId, userPw, userName, GradeIdx, userPhone) VALUES ($1,$2,$3,$4,$5)`;

    try{
        const result = await client.query(sql, [userId, userPw, userName, userGrade, userPhone])
        next()
    } catch(e) {
        next(e)
    }
}

module.exports = createUser