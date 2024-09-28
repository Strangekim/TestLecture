const customError = require("../Module/customError")
const jwt = require("jsonwebtoken")

const checkLogin = (req, res, next) => {
    const key = process.env.JWT_SIGNATURE_KEY

    // Author... 이걸로 하면 왜 안됨..?
    const {authorization} = req.headers

    try {
        if (!authorization) throw customError(401, "로그인 후 이용해주십시오.")
        
        req.decoded = jwt.verify(authorization, key)
        next()
    } catch (e){
        if(e.name === "TokenExpiredError"){
            e.status = 419
        }
        if(e.name === "JsonWebTokenError") {
            e.status = 401
        }
        next(e)
    }
}

module.exports = checkLogin