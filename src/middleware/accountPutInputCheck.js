const customError = require("../Module/customError")
const {regId, regPw, regName, regPhone, regUserGrade, regIdx} = require("../Constant/regx")

const accountPutInputCheck = (req, res, next) => {
    const {userId, userPw, userGrade} = req.body
        try {
            if(!userId && !userPw && !userGrade){
                throw customError(400, `수정할 값이 존재하지 않습니다.`)
            }
            if(userId && !regId.test(userId)){
                throw customError(400, "잘못된 이름입니다.")
            }
            if(userPw && !regPw.test(userPw)){
                throw customError(400, "잘못된 비밀번호입니다.")
            }
            if(userGrade && !regUserGrade.test(userGrade)){
                throw customError(400, "잘못된 이름입니다.")
            }
            next()
        } catch (e){
            res.status(e.status || 500).send({
                "message" : e.message,
                "status" : e.status
            })
        }
}

module.exports = accountPutInputCheck