const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regIdx} = require("../Constant/regx")
const checkinput = require("../middleware/checkInput")
const Login = require("../accessDB/Login")
const checkLogin = require("../middleware/checkLogIn")
const notFoundInformation = require("../accessDB/notFoundInformation")
const conflictError = require("../accessDB/conflictError")
const logOut = require("../middleware/logOut")
const {createUser} = require("../accessDB/result/create")
const {deleteUser} = require("../accessDB/result/delete")
const {findId,findPw} = require("../accessDB/result/get")
const {updateUser} = require("../accessDB/result/put")

const successResponse = require("../Module/responseWrapper")


// 로그인
router.get("/log-in",
    checkinput(regId,"userid"), 
    checkinput(regPw, "userpw"), 
    Login,
    successResponse("로그인 성공")
)

// 로그아웃
router.get("/log-out", 
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    logOut,
    successResponse("로그아웃 성공")
)

// 회원 탈퇴
router.delete("/", 
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    deleteUser,
    successResponse("회원 탈퇴 성공")
)  

// ID 찾기
router.get("/find-id",
    checkinput(regPhone, "userPhone"),
    notFoundInformation('Account.user','userPhone'),
    findId
)

// PW 찾기
router.get("/find-pw",
    checkinput(regPhone, "userPhone"),
    checkinput(regName, "userName"),
    notFoundInformation('Account.user','userPhone'),
    notFoundInformation('Account.user','userName'),
    findPw
)

// 계정 생성
router.post("/",
    checkinput(regName, "userName"),
    checkinput(regId, "userId"),
    checkinput(regPw, "userPw"),
    checkinput(regPhone, "userPhone"),
    checkinput(regUserGrade, "userGrade"),
    conflictError('Account.user',"userId"),
    conflictError('Account.user',"userPhone"),
    createUser,
    successResponse("회원가입 성공")
)

// 계정 수정
router.put("/",
    checkinput(regPw, "userPw"),
    checkinput(regUserGrade, "userGrade"),
    checkLogin,
    updateUser,
    successResponse("회원정보 수정 성공")
)

module.exports = router