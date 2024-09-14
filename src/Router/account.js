const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regIdx} = require("../Constant/regx")

const dataLog = require("../database/mongoDB")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")
const logOut = require("../middleware/logOut")

const {notFoundInformation} = require("../middleware/notFoundInformation")
const {checkDuplication} = require("../middleware/checkConflict")

const {Login,deleteUser,updateUser,createUser,findPw,findId} = require("../service/accountService")

// 로그인
router.get("/log-in",
    checkinput(regId,"userid"), 
    checkinput(regPw, "userpw"), 
    Login
)

// 로그아웃
router.get("/log-out", 
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    logOut
)

// 회원 탈퇴
router.delete("/", 
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    deleteUser
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
    checkDuplication('Account.user',"userId"),
    checkDuplication('Account.user',"userPhone"),
    createUser
)

// 계정 수정
router.put("/",
    checkinput(regPw, "userPw"),
    checkinput(regUserGrade, "userGrade"),
    checkLogin,
    updateUser
)

module.exports = router