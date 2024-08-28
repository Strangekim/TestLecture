const customError = require("../Module/customError")

const checkinput = (reg, check) => {
    return (req, res, next) => {
        const value = req.body[check]

        try {
            if(!reg.test(value) || !value){
            throw customError(400, `잘못된 ${check} 입니다.`)
            }
            next()
        } catch (e){
            res.status(e.status)({
                "message" : e.message,
                "status" : e.status
            })
        }
        
    }
}

module.exports = checkinput