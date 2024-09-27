const client = require("../database/postgreSQL")
const customError = require("../Module/customError")

//로그인 
const Login = async (req,res,next) => {
    const {userid, userpw} = req.body;
    const sql = `SELECT * FROM Account.user WHERE userid = $1 AND userpw = $2`

    try{
        const result = await client.query(sql, [userid,userpw])
        if(!result.rows[0]) throw customError(403, "아이디와 비밀번호가 일치하지 않습니다.")

        req.session.useridx = result.rows[0].useridx
        req.session.gradeidx = result.rows[0].gradeidx

        res.status(200).send({})
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
            res.status(200).send({
                "message" : result.rows[0].userid
            })
        } 
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
            res.status(200).send({
                "message" : result.rows[0].userpw
            })
        } 
    } catch(e){
        next(e)
    }

}

// 회원가입
const createUser = async (req,res,next) => {
    const {userId, userPw, userName, userPhone, userGrade} = req.body;
    const sql = `INSERT INTO Account.user (userId, userPw, userName, GradeIdx, userPhone) VALUES ($1,$2,$3,$4,$5)`;

    try{
        const result = await client.query(sql, [userId, userPw, userName, userGrade, userPhone])
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

// 회원 정보 수정
const updateUser = async (req,res,next) => {
    const {userIdx} = req.session;
    const {userPw, userGrade} = req.body;
    const sql = `UPDATE Account.user SET userpw = $1, Gradeidx = $2 WHERE useridx = $3`;

    try{
        const result = await client.query(sql, [userPw, userGrade, userIdx])
        if(result.rowCount === 0) throw customError(404, "계정 정보가 존재하지 않습니다.")
        res.status(200).send({})
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
        res.status(200).send({})
    } catch(e) {
        next(e)
    }
}

module.exports = {Login,deleteUser,updateUser,createUser,findPw,findId}

