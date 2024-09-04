const conn = require("../database/postgreSQL")

const checkGrade = (req,res,next) => {
    const {userGrade} = req.session

    if(!userGrade){
        return res.status(403).send({
            "message" : "카테고리 생성 권한이 없습니다."
        })
    }
    next()
}



module.exports = checkGrade