const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regIdx} = require("../Constant/regx")
const {notUserIdxErrorFunc, inputErrorFunc, cantAcessErrorFunc, notFoundErrorFunc, conflictErrorFunc, errorState, successFunc} = require("../Constant/error") 


// 로그인
router.get("/log-in", (req,res) => {
    const {userId, userPw} = req.body;

    try {
        inputErrorFunc(userId, "아이디", regId)
        inputErrorFunc(userPw, "비밀번호", regPw)

        // DB 연결 후 로그인 실패 시 403
        const rows = []

        cantAcessErrorFunc(rows, "아이디와 비밀번호가 일치하지 않습니다.")

        successFunc(res, "로그인 성공")
    } catch(e){
        errorState(res, e)
    }
})

// 로그아웃
router.get("/log-out", (req,res) => {
    const {userIdx} = req.session

    try {
        notUserIdxErrorFunc(userIdx)

        // DB 연결
        const rows = []
        
        notFoundErrorFunc(rows, "계정정보")

        successFunc(res, "로그아웃 성공")
        req.session.destroy(); 
    } catch(e) {
        errorState(res, e)
    }
})

// 계정 삭제
router.delete("/", (req,res) => {
    const userIdx = req.session.userIdx

    try {
        notUserIdxErrorFunc(userIdx)

        // DB 연결
        const rows = []
        
        notFoundErrorFunc(rows, "계정정보")

        successFunc(res, "회원탈퇴")
    } catch(e) {
        errorState(res, e)
    }
})  

// ID 찾기
router.get("/find-id", (req,res) => {
    const {userPhone} = req.body

    try {
        inputErrorFunc(userPhone, "전화번호", regPhone)

        // DB 연결 후 로그인 실패 시 403
        const rows = []

        notFoundErrorFunc(rows, "전화번호")
        successFunc(res, "아이디 찾기")
    } catch(e){
        errorState(res, e)
    }
})

// PW 찾기
router.get("/find-pw", (req,res) => {
    const {userPhone, userName} = req.body

    try {
        inputErrorFunc(userPhone, "전화번호", regPhone)
        inputErrorFunc(userName, "이름", regName)

        // DB 연결
        const rows = []

        notFoundErrorFunc(rows, "전화번호")
        cantAcessErrorFunc(rows, "이름이 일치하지 않습니다.")

        successFunc(res, "비밀번호 찾기")       
    } catch(e){
        errorState(res, e)
    }
})

// 계정 생성
router.post("/", (req,res) => {

    const {userName, userId, userPw, userPhone, userGrade} = req.body

    try {
        inputErrorFunc(userName, "이름", regName)
        inputErrorFunc(userId, "아이디", regId)
        inputErrorFunc(userPw, "비밀번호", regPw)
        inputErrorFunc(userPhone, "전화번호", regPhone)
        inputErrorFunc(userGrade, "등급", regIdx)

        // DB 연결
        const rows = []

        conflictErrorFunc(rows, "전화번호")
        conflictErrorFunc(rows, "아이디")

        successFunc(res, "계정 생성 성공")
    } catch(e){
        errorState(res, e)
    }
    
})

// 계정 수정
router.put("/", (req,res) => {

    const {userId, userPw, userGrade} = req.body
    const {userIdx} = req.session

    try {
        if (!userId & !userPw) {
            const err = new Error("수정할 값이 존재하지 않습니다.")
            err.status = 400
            throw err
        }
        if(userId){inputErrorFunc(userId, "아이디", regId)}
        if(userPw){inputErrorFunc(userPw, "비밀번호", regPw)}
        if(userGrade){inputErrorFunc(userGrade, "등급", regUserGrade)}
        // 401
        // notUserIdxErrorFunc(userIdx)

        const rows = []
        notFoundErrorFunc(rows, "계정 정보")
        successFunc(res, "회원 정보 수정 성공")
    } catch(e){
        errorState(res, e)
    }
})




module.exports = router