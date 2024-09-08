const client = require("../../../database/postgreSQL")
const customError = require("../../../Module/customError")

// 회원 정보 수정
const updateUser = async (req,res,next) => {
    const {userIdx} = req.session;
    const {userPw, userGrade} = req.body;
    const sql = `UPDATE Account.user SET userpw = $1, Gradeidx = $2 WHERE useridx = $3`;

    try{
        const result = await client.query(sql, [userPw, userGrade, userIdx])
        if(result.rowCount === 0) throw customError(404, "계정 정보가 존재하지 않습니다.")
        next()
    } catch(e) {
        next(e)
    }
}

// 게시글 수정
const updateArticle = async (req,res,next) => {
    const {articleidx} = req.params;
    const {useridx} = req.session;
    const {categoryidx, articletitle, articlecontent} = req.body;
    const sql = `UPDATE Article.article SET categoryidx = $1, articletitle = $2, articlecontent = $3 WHERE articleidx = $4 AND useridx = $5`;

    try{
        const result = await client.query(sql, [categoryidx, articletitle, articlecontent,articleidx,useridx])
        next()
    } catch(e) {
        next(e)
    }
}

// 카테고리 제목 수정
const updateCategory = async (req,res,next) => {
    const {categoryname} = req.body
    const {categoryidx} = req.params
    const sql = `UPDATE Article.category SET categoryname = $1 WHERE categoryidx = $2`;

    try{
        const result = await client.query(sql, [categoryname, categoryidx])
        next()
    } catch(e) {
        next(e)
    }
}

const updateComment = async (req,res,next) => {
    const {commentidx} = req.params
    const {commentcontent} = req.body

    const sql = `UPDATE Comment.comment SET commentcontent = $1 WHERE commentidx = $2`
    
    try {
        await client.query(sql, [commentcontent,commentidx])
        next()
    } catch(e) {
        next(e)
    }
}

module.exports = {updateUser,updateArticle,updateCategory,updateComment}