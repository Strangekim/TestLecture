const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

// 카테고리 생성
const createCategory = async (req,res,next) => {
    const {categoryname} = req.body
    const sql = 'INSERT INTO Article.category (categoryname) VALUES ($1)'

    try{
        const result = await client.query(sql, [categoryname])
        res.status(200).send({})
    } catch(e){
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
        res.status(200).send({})
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
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

module.exports = {deleteCategory,updateCategory,createCategory}