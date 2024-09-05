const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regIdx, regCategoryName} = require("../Constant/regx")
const checkinput = require("../middleware/checkInput")
const Login = require("../accessDB/Login")
const checkLogin = require("../middleware/checkLogIn")
const notFoundInformation = require("../accessDB/notFoundInformation")
const conflictError = require("../accessDB/conflictError")
const logOut = require("../middleware/logOut")
const createUser = require("../accessDB/createUser")
const deleteUser = require("../accessDB/deleteUser")
const findId = require("../accessDB/findId")
const findPw = require("../accessDB/findPw")
const updateUser = require("../accessDB/updateUser")
const conflictCategoryName = require("../accessDB/conflictCategoryName")
const createCategory = require("../accessDB/createCategory")

const checkGrade = require("../middleware/checkGrade")

const successResponse = require("../Module/responseWrapper")

//카테고리 추가
router.post("/",
    checkinput(regCategoryName,"categoryname"),
    checkLogin,
    checkGrade,
    notFoundInformation('useridx'),
    conflictCategoryName,
    createCategory,
    successResponse("카테고리 추가 성공")
)

//카테고리 수정
router.put("/:categoryIdx", (req,res) => {
    const {userGrade,userIdx} = req.session
    const {categoryIdx} = req.params
    const {categoryName} = req.body

    try {
        inputErrorFunc(categoryIdx, "게시판", regIdx)
        inputErrorFunc(categoryName, "카테고리 이름", regCategoryName)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        // cantAcessErrorFunc(rows, "카테고리 수정 권한이 없습니다.")
        // notFoundErrorFunc(rows, "카테고리")
        conflictErrorFunc(rows, "카테고리 명")

        successFunc(res, "카테고리 수정 성공")
        
    } catch (e) {
        errorState(res, e)
    }
})

//카테고리 삭제
router.delete("/:categoryIdx", (req,res) => {
    const {userGrade,userIdx} = req.session
    const {categoryIdx} = req.params

    try {
        inputErrorFunc(categoryIdx, "게시판", regIdx)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        // cantAcessErrorFunc(rows, "카테고리 삭제 권한이 없습니다.")
        notFoundErrorFunc(rows, "카테고리")

        successFunc(res, "카테고리 삭제 성공")
        
    } catch (e) {
        errorState(res, e)
    }
})

module.exports = router