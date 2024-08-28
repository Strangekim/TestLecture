const customError = require("../Module/customError")

const checkLogin = (req, res, next) => {
    const {usridx} = req.session

    try {
        if (!usridx) throw customError(401, "로그인 후 이용 부탁")
        
        next()
    } catch (e){
        res.status(e.status || 500).send({
            "message" : e.message
        })
    }
}

module.exports = checkLogin