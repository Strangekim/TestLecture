const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regIdx} = require("../Constant/regx")
const checkinput = require("../middleware/checkInput")
const connectLogin = require("../middleware/connectLogin")
const notFoundIdx = require("../middleware/notFoundIdx")
const checkLogin = require("../middleware/checkLogIn")
const notFoundPhone = require("../middleware/notFoundPhone")
const notFoundPhoneName = require("../middleware/notFoundPhoneName")
const conflictError = require("../middleware/conflictError")
const accountPutInputCheck = require("../middleware/accountPutInputCheck")
const logOut = require("../middleware/logOut")
const createUser = require("../successMiddleware/createUser")

const successResponse = require("../Module/responseWrapper")


// 로그인
router.get("/log-in",
    checkinput(regId,"userId"), 
    checkinput(regPw, "userPw"), 
    connectLogin,
    successResponse("로그인 성공")
)

// 로그아웃
router.get("/log-out", 
    checkLogin,
    notFoundIdx,
    logOut,
    successResponse("로그아웃 성공")
)

// 회원 탈퇴
router.delete("/", 
    checkLogin,
    notFoundIdx,
    successResponse("회원 탈퇴 성공")
)  

// ID 찾기
router.get("/find-id",
    checkinput(regPhone, "userPhone"),
    notFoundPhone
)

// PW 찾기
router.get("/find-pw",
    checkinput(regPhone, "userPhone"),
    checkinput(regName, "userName"),
    notFoundPhoneName
)

// 계정 생성
router.post("/",
    checkinput(regName, "userName"),
    checkinput(regId, "userId"),
    checkinput(regPw, "userPw"),
    checkinput(regPhone, "userPhone"),
    checkinput(regUserGrade, "userGrade"),
    conflictError("userId"),
    conflictError("userPhone"),
    createUser,
    successResponse("회원가입 성공")
)

// 계정 수정
router.put("/",
    accountPutInputCheck,
    checkLogin,
    // 실제 계정 수정 미들웨어
    successResponse("회원정보 수정 성공")
)




module.exports = router