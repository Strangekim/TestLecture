const router = require("express").Router()
const {regIdx, regCategoryName} = require("../Constant/regx")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")
const checkGrade = require("../middleware/checkGrade")

const {notFoundInformation} = require("../middleware/accessDB/check/notFoundInformation")
const {checkDuplication} = require("../middleware/accessDB/check/checkConflict")
const {createCategory} = require("../middleware/accessDB/result/create")
const {updateCategory} = require("../middleware/accessDB/result/put")
const {deleteCategory} = require("../middleware/accessDB/result/delete")

const successResponse = require("../Module/responseWrapper")

//카테고리 추가
router.post("/",
    checkinput(regCategoryName,"categoryname"),
    checkLogin,
    checkGrade,
    notFoundInformation('Account.user','useridx'),
    checkDuplication('Article.category',"categoryname"),
    createCategory,
    successResponse("카테고리 추가 성공")
)

//카테고리 수정
router.put("/:categoryidx",
    checkinput(regCategoryName,"categoryname"),
    checkinput(regIdx,"categoryidx"),
    checkLogin,
    checkGrade,
    notFoundInformation('Account.user','useridx'),
    checkDuplication('Article.category',"categoryname"),
    updateCategory,
    successResponse("카테고리 수정 성공")
)

//카테고리 삭제
router.delete("/:categoryidx", 
    checkinput(regIdx,"categoryidx"),
    checkLogin,
    checkGrade,
    notFoundInformation('Article.category', 'categoryidx'),
    deleteCategory,
    successResponse("카테고리 삭제 성공")    
)

module.exports = router