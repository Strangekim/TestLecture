const client = require("../../../database/postgreSQL")
const customError = require("../../../Module/customError")

//로그인 
const Login = async (req,res,next) => {
    const {userid, userpw} = req.body;
    const sql = `SELECT * FROM Account.user WHERE userid = $1 AND userpw = $2`

    try{
    const result = await client.query(sql, [userid,userpw])

    if(!result.rows[0]) throw customError(403, "아이디와 비밀번호가 일치하지 않습니다.")

    next()
    } catch (e) {
        next(e)
    }
}

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
// 게시글 검색
const searchArticle = async (req,res,next) => {
    const {searchContent} = req.body;
    const searchPattern = `%${searchContent}%`

    const sql = 
    `
    SELECT 
        userid, articletitle, articlecontent
    FROM 
        Article.article 
    INNER JOIN 
        Account.user ON Article.article.useridx = Account.user.useridx 
    WHERE 
        articlecontent LIKE $1 OR articletitle LIKE $1
    `

    try{
        const result = await client.query(sql,[searchPattern])
        return res.status(200).send({
            "message" : result.rows
        })
    }catch(e){
        next(e)
    }
}

// 댓글 검색
const searchComment = async (req,res,next) => {
    const {searchContent} = req.body;
    const searchPattern = `%${searchContent}%`

    const sql = 
    `
    SELECT 
        userid, commentcontent
    FROM 
        Comment.comment 
    INNER JOIN 
        Account.user ON Comment.comment.useridx = Account.user.useridx 
    WHERE 
        commentContent LIKE $1 OR userid LIKE $1
    `

    try{
        const result = await client.query(sql,[searchPattern])
        return res.status(200).send({
            "message" : result.rows
        })
    }catch(e){
        next(e)
    }
}

module.exports = {findId,findPw,getArticle,Login,searchComment,searchArticle}