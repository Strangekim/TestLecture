const client = require("../../database/postgreSQL")
const customError = require("../../Module/customError")

// 계정 찾기
const findId = async (req,res,next) => {
    const {userPhone} = req.body
    const sql = `SELECT userid FROM Account.user WHERE userphone = $1`

    try{
        const result = await client.query(sql, [userPhone])
        if(!result.rows[0]) throw customError (404, "전화번호가 존재하지 않습니다.")
        if(result.rows[0]) {
            return res.status(200).send({
                "message" : result.rows[0].userid
            })
        } 
        next()
    } catch(e){
        next(e)
    }

}

// 비밀번호 찾기
const findPw = async (req,res,next) => {
    const {userPhone, userName} = req.body
    const sql = `SELECT userPw FROM Account.user WHERE userPhone = $1 AND userName = $2`

    try{
        const result = await client.query(sql, [userPhone,userName])
        if(!result.rows[0]) throw customError (404, "전화번호가 존재하지 않습니다.")
        if(result.rows[0]) {
            return res.status(200).send({
                "message" : result.rows[0].userpw
            })
        } 
        next()
    } catch(e){
        next(e)
    }

}

// 계시글 가져오기
const getArticle = async (req,res,next)  => {
    const {categoryidx,page,limit} = req.query;
    const offset = (page - 1) * limit;

    const sql = `SELECT * FROM Article.article WHERE categoryidx = $1 LIMIT $2 OFFSET $3`;

    try{
        const result = await client.query(sql,[categoryidx,limit,offset])
        return res.status(200).send({
            "message" : result.rows
        })
    }catch(e){
        next(e)
    }
}

module.exports = {findId,findPw,getArticle}