const router = require("express").Router()
const {regIdx, regCategoryName} = require("../Constant/regx")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")
const checkGrade = require("../middleware/checkGrade")

const {notFoundInformation} = require("../middleware/notFoundInformation")
const {checkDuplication} = require("../middleware/checkConflict")

const {deleteCategory,updateCategory,createCategory} = require("../service/categoryService")


//카테고리 추가
router.post("/",
    checkinput(regCategoryName,"categoryname"),
    checkLogin,
    checkGrade,
    notFoundInformation('Account.user','useridx'),
    checkDuplication('Article.category',"categoryname"),
    createCategory
)

//카테고리 수정
router.put("/:categoryidx",
    checkinput(regCategoryName,"categoryname"),
    checkinput(regIdx,"categoryidx"),
    checkLogin,
    checkGrade,
    notFoundInformation('Account.user','useridx'),
    checkDuplication('Article.category',"categoryname"),
    updateCategory
)

//카테고리 삭제
router.delete("/:categoryidx", 
    checkinput(regIdx,"categoryidx"),
    checkLogin,
    checkGrade,
    notFoundInformation('Article.category', 'categoryidx'),
    deleteCategory   
)

module.exports = router