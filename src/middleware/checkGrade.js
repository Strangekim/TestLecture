const customError = require("../Module/customError")
const admin = require("../Constant/constant")

const checkGrade = (req,res,next) => {
    const {gradeidx} = req.decoded
    try{
    if(!gradeidx || gradeidx != admin) throw customError(403, "권한이 없습니다.")
        next()
    } catch(e){
        next(e)
    }
}



module.exports = checkGrade