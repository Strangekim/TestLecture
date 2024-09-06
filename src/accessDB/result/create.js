const client = require("../../database/postgreSQL")
const customError = require("../../Module/customError")

// 회원가입
const createUser = async (req,res,next) => {
    const {userId, userPw, userName, userPhone, userGrade} = req.body;
    const sql = `INSERT INTO Account.user (userId, userPw, userName, GradeIdx, userPhone) VALUES ($1,$2,$3,$4,$5)`;

    try{
        const result = await client.query(sql, [userId, userPw, userName, userGrade, userPhone])
        next()
    } catch(e) {
        next(e)
    }
}

// 게시글 생성
const createArticle =  async (req,res,next) => {
    const {categoryidx} = req.query
    const {articletitle, articlecontent} = req.body;
    const {useridx} = req.session

    const sql = `INSERT INTO Article.article (categoryidx, articletitle, articlecontent, useridx) VALUES ($1,$2,$3,$4)`;

    try{
        const result = await client.query(sql, [categoryidx, articletitle, articlecontent, useridx])
        next()
    }catch(e){
        next(e)
    }
}

// 게시글 좋아요
const createArticleLike = async (req,res,next) => {
    const {articleidx} = req.params
    const {useridx} = req.session

    try{
        await client.query('BEGIN')
        await client.query('INSERT INTO Article.articleLike (articleidx, useridx) VALUES ($1,$2)',[articleidx,useridx])
        await client.query('UPDATE Article.article SET articlelikecount = articlelikecount + 1 WHERE articleidx = $1', [articleidx])
        await client.query('COMMIT')
        next()
    }catch(e){
        next(e)
    }
}

// 카테고리 생성
const createCategory = async (req,res,next) => {
    const {categoryname} = req.body
    const sql = 'INSERT INTO Article.category (categoryname) VALUES ($1)'

    try{
        const result = await client.query(sql, [categoryname])
        next()
    } catch(e){
        next(e)
    }
}

// 댓글 생성
const createComment = async (req,res,next) => {
    const {articleidx,commentcontent} = req.body
    const {useridx} = req.session
    const sql = `INSERT INTO Comment.comment (articleidx, useridx, commentcontent) VALUES ($1,$2,$3)`

    try{
        await client.query(sql,[articleidx,useridx,commentcontent])
        next()
    }catch(e){
        next(e)
    }
}

module.exports = {createArticle,createArticleLike,createUser,createCategory,createComment}