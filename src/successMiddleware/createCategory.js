const conn = require("../database/database")

const createCategory = (req,res,next) => {
    const {categoryName} = req.body

    const sql = `INSERT INTO category (categoryName) VALUES (?)`;

    conn.query(sql,[categoryName] ,function (err,result){
        if(err){
            return res.status(500).send({
                "message" : "DB 서버 연결에 실패하였습니다."
            })
        }
        next()
    })
}

module.exports = createCategory