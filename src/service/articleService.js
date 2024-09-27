const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

// 계시글 가져오기
const getArticle = async (req,res,next)  => {
    const {categoryidx,page,limit} = req.query;
    const offset = (page - 1) * limit;

    const sql = `SELECT * FROM Article.article WHERE categoryidx = $1 LIMIT $2 OFFSET $3`;

    try{
        const result = await client.query(sql,[categoryidx,limit,offset])
        res.rows = result.rows
        res.status(200).send({
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
        res.status(200).send({
            "message" : result.rows
        })
    }catch(e){
        next(e)
    }
}

// 게시글 생성
const createArticle =  async (req,res,next) => {
    const {categoryidx} = req.query
    const {articletitle, articlecontent} = req.body;
    const {useridx} = req.session

    const sql = 
    `
    INSERT INTO 
        Article.article (categoryidx, articletitle, articlecontent, useridx) 
    VALUES 
        ($1,$2,$3,$4)
    `;

    try{
        const result = await client.query(sql, [categoryidx, articletitle, articlecontent, useridx])
        res.status(200).send({})
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

        res.status(200).send({})
    }catch(e){
        next(e)
    }
}

// 게시글 수정
const updateArticle = async (req,res,next) => {
    const {articleidx} = req.params;
    const {useridx} = req.session;
    const {categoryidx, articletitle, articlecontent} = req.body;
    const sql = 
    `
    UPDATE 
        Article.article 
    SET 
        categoryidx = $1, articletitle = $2, articlecontent = $3 
    WHERE 
        articleidx = $4 
    AND 
        useridx = $5
    `;

    try{
        const result = await client.query(sql, [categoryidx, articletitle, articlecontent,articleidx,useridx])
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

// 게시글 삭제
const deleteArticle = async (req,res,next) => {
    const {articleidx} = req.params
    const {useridx} = req.session

    const sql = `DELETE FROM Article.article WHERE useridx = $1 AND articleidx = $2`;

    try{
        const result = await client.query(sql, [useridx,articleidx])
        res.status(200).send({})
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
        
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

module.exports = {deleteArticleLike,deleteArticle,updateArticle,createArticleLike,createArticle,searchArticle,getArticle}