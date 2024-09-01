const customError = require("../Module/customError")

const checkParamInput = (reg, check) => {
    return (req, res, next) => {
        const value = req.params[check]

        try {
            if(!reg.test(value) || !value){
            throw customError(400, `잘못된 ${check} 입니다.`)
            }
            next()
        } catch (e){
            res.status(e.status || 500).send({
                "message" : e.message,
                "status" : e.status
            })
        }
        
    }
}

module.exports = checkParamInput