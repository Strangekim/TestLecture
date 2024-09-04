const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

const deleteUser = async (req,res,next) => {
    const {userIdx} = req.session
    const sql = `DELETE FROM Account.user WHERE userIdx = $1`

    try{
        const result = await client.query(sql, [userIdx])
        next()
    } catch(e) {
        next(e)
    }
}

module.exports = deleteUser