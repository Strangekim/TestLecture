const conn = require("../database/database")

const conflictCategoryName = (req,res,next) => {
        const {categoryName} = req.body
        const sql = `SELECT * FROM category WHERE categoryName = ?`

        conn.query(sql, [categoryName],function (err,result){
            if(err){
                return res.status(500).send({
                    "message" : "DB서버 연결에 실패하였습니다."
                })
            }
            if (result.length > 0) {
                return res.status(409).send({ 
                    "message": `중복된 카테고리 명 입니다.`
                })
            }
            if(result.length == 0){
                next()
            }
        })
}

module.exports = conflictCategoryName