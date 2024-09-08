const client = require("../../../database/postgreSQL")
const customError = require("../../../Module/customError")

// 게시글 삭제
const deleteArticle = async (req,res,next) => {
    const {articleidx} = req.params
    const {useridx} = req.session

    const sql = `DELETE FROM Article.article WHERE useridx = $1 AND articleidx = $2`;

    try{
        const result = await client.query(sql, [useridx,articleidx])
        next()
    } catch(e) {
        next(e)
    }
}

// 게시글 좋아요 삭제
const deleteArticleLike = async (req,res,next) => {
    const {articleidx} = req.params
    const {useridx} = req.session
    
    try{
        await client.query('BEGIN')
        await client.query('DELETE FROM Article.articleLike WHERE articleidx = $1 AND useridx = $2',[articleidx,useridx])
        await client.query('UPDATE Article.article SET articlelikecount = articlelikecount - 1 WHERE articleidx = $1', [articleidx])
        await client.query('COMMIT')
        next()
    } catch(e) {
        next(e)
    }
}

// 회원 탈퇴
const deleteUser = async (req,res,next) => {
    const {userIdx} = req.session
    const sql = `DELETE FROM Account.user WHERE userIdx = $1`

    try{
        const result = await client.query(sql, [userIdx])
        next()
    } catch(e) {
        next(e)
    }
}

// 카테고리 삭제
const deleteCategory = async (req,res,next) => {
    const {categoryidx} = req.params
    const sql = `DELETE FROM Article.category WHERE categoryidx = $1`;

    try{
        const result = await client.query(sql, [categoryidx])
        next()
    } catch(e) {
        next(e)
    }
}

// 댓글 삭제
const deleteComment = async (req,res,next) => {
    const {commentidx} = req.params
    const {useridx} = req.session

    const sql = `DELETE FROM Comment.comment WHERE useridx = $1 AND commentidx = $2`;

    try{
        const result = await client.query(sql, [useridx,commentidx])
        next()
    } catch(e) {
        next(e)
    }
}

// 댓글 좋아요 삭제
const deleteCommentLike = async (req,res,next) => {
    const {commentidx} = req.params
    const {useridx} = req.session
    
    try{
        await client.query('BEGIN')
        await client.query('DELETE FROM Comment.commentLike WHERE commentidx = $1 AND useridx = $2',[commentidx,useridx])
        await client.query('UPDATE Comment.comment SET commentlikecount = commentlikecount - 1 WHERE commentidx = $1', [commentidx])
        await client.query('COMMIT')
        next()
    } catch(e) {
        next(e)
    }
}


module.exports = {deleteArticleLike,deleteArticle,deleteUser,deleteCategory,deleteCommentLike,deleteComment}