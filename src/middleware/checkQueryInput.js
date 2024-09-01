const customError = require("../Module/customError")

const checkQueryInput = (reg, check) => {
    return (req, res, next) => {
        const value = req.query[check]

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

module.exports = checkQueryInput