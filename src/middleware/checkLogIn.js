const customError = require("../Module/customError")

const checkLogin = (req, res, next) => {
    const {useridx} = req.session

    try {
        if (!useridx) throw customError(401, "로그인 후 이용해주십시오.")
        next()
    } catch (e){
        next(e)
    }
}

module.exports = checkLogin