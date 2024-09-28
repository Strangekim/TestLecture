const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

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
        res.status(200).send({
            "message" : result.rows
        })
    }catch(e){
        next(e)
    }
}

// 댓글 생성
const createComment = async (req,res,next) => {
    const {articleidx,commentcontent} = req.body
    const {useridx} = req.decoded
    const sql = `INSERT INTO Comment.comment (articleidx, useridx, commentcontent) VALUES ($1,$2,$3)`

    try{
        await client.query(sql,[articleidx,useridx,commentcontent])
        res.status(200).send({})
    }catch(e){
        next(e)
    }
}

// 댓글 좋아요 생성
const createCommentLike = async (req,res,next) => {
    const {commentidx} = req.params
    const {useridx} = req.decoded

    try{
        await client.query('BEGIN')
        await client.query('INSERT INTO Comment.commentlike (commentidx, useridx) VALUES ($1,$2)',[commentidx,useridx])
        await client.query('UPDATE Comment.comment SET commentlikecount = commentlikecount + 1 WHERE commentidx = $1', [commentidx])
        await client.query('COMMIT')
        res.status(200).send({})
    }catch(e){
        next(e)
    }
}

// 댓글 수정
const updateComment = async (req,res,next) => {
    const {commentidx} = req.params
    const {commentcontent} = req.decoded

    const sql = `UPDATE Comment.comment SET commentcontent = $1 WHERE commentidx = $2`
    
    try {
        await client.query(sql, [commentcontent,commentidx])
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

// 댓글 삭제
const deleteComment = async (req,res,next) => {
    const {commentidx} = req.params
    const {useridx} = req.decoded

    const sql = `DELETE FROM Comment.comment WHERE useridx = $1 AND commentidx = $2`;

    try{
        const result = await client.query(sql, [useridx,commentidx])
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

// 댓글 좋아요 삭제
const deleteCommentLike = async (req,res,next) => {
    const {commentidx} = req.params
    const {useridx} = req.decoded
    
    try{
        await client.query('BEGIN')
        await client.query('DELETE FROM Comment.commentLike WHERE commentidx = $1 AND useridx = $2',[commentidx,useridx])
        await client.query('UPDATE Comment.comment SET commentlikecount = commentlikecount - 1 WHERE commentidx = $1', [commentidx])
        await client.query('COMMIT')
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

module.exports = {deleteCommentLike,deleteComment,updateComment,createCommentLike,createComment,searchComment}