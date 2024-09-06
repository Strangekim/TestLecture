const customError = require("../Module/customError")

const checkGrade = (req,res,next) => {
    const {gradeidx} = req.session
    try{
    if(!gradeidx || gradeidx != 1) throw customError(403, "카테고리 생성 권한이 없습니다.")
        next()
    } catch(e){
        next(e)
    }
}



module.exports = checkGrade