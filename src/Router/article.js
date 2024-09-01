const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regArticleCategory, regIdx, regArticleTitle, regArticleContent} = require("../Constant/regx")
const {notUserIdxErrorFunc, inputErrorFunc, cantAcessErrorFunc, notFoundErrorFunc, conflictErrorFunc, errorState, successFunc} = require("../Constant/error")

const checkinput = require("../middleware/checkInput")
const connetLogin = require("../middleware/connectLogin")
const notFoundIdx = require("../middleware/notFoundIdx")
const checkLogin = require("../middleware/checkLogIn")
const notFoundPhone = require("../middleware/notFoundPhone")
const notFoundPhoneName = require("../middleware/notFoundPhoneName")
const conflictError = require("../middleware/conflictError")
const accountPutInputCheck = require("../middleware/accountPutInputCheck")
const logOut = require("../middleware/logOut")
const createArticle = require("../successMiddleware/createArticle")
const notFoundCategory = require("../middleware/notFoundCategory")
const checkQueryInput = require("../middleware/checkQueryInput")
const getArticle = require("../successMiddleware/getArticle")
const checkParamInput = require("../middleware/checkParamInput")
const createArticleLike = require("../successMiddleware/createArticleLike")


const successResponse = require("../Module/responseWrapper")



// 게시글 목록 가져오기
router.get("/",
    checkQueryInput(regArticleCategory,"categoryIdx"),
    notFoundCategory,
    getArticle
)

// 게시글 작성
router.post("/",
    checkQueryInput(regArticleCategory,"categoryIdx"),
    checkinput(regArticleTitle,"articleTitle"),
    checkinput(regArticleContent,"articleContent"),
    notFoundIdx,
    notFoundCategory,
    createArticle,
    successResponse("게시글 작성 성공")
)

//게시글 수정
router.put("/:articleIdx", (req,res) => {
    const {articleIdx} = req.params
    const {articleCategory, articleTitle, articleContent} = req.body
    const {userIdx} = req.session

    try {
        inputErrorFunc(articleIdx, "게시글", regIdx)
        inputErrorFunc(articleCategory, "게시판 종류", regArticleCategory)
        inputErrorFunc(articleTitle, "게시글 제목", regArticleTitle)
        inputErrorFunc(articleContent, "게시글 내용", regArticleContent)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        cantAcessErrorFunc(rows, "본인의 게시글이 아닙니다.")

        // notFoundErrorFunc(rows, "카테고리")
        // notFoundErrorFunc(rows, "게시글")

        successFunc(res, "게시글 수정 성공")
        
    } catch (e) {
        errorState(res, e)
    }

})

// 게시글 삭제
router.delete("/:articleIdx", (req,res) => {
    const {articleIdx} = req.params
    const {userIdx} = req.session

    try {
        inputErrorFunc(articleIdx, "게시글", regIdx)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        cantAcessErrorFunc(rows, "본인의 게시글이 아닙니다.")

        // notFoundErrorFunc(rows, "카테고리")
        // notFoundErrorFunc(rows, "게시글")

        successFunc(res, "게시글 삭제 성공")
        
    } catch (e) {
        errorState(res, e)
    }
})


// 게시글 검색
router.get("/search-article", (req,res) => {
    const {articleTitle, userId, articleContent} = req.body
    const {userIdx} = req.session

    // 게시글 작성 시간 정규표현식으로 예외처리
    try {
        if(!articleTitle && !userId && !articleContent){
            const err = new Error("하나의 값은 입력되어야 합니다.")
            err.status = 400
            throw err
        }
        if(articleTitle){
            inputErrorFunc(articleTitle, "게시글 제목", regArticleTitle)            
        }
        if(userId) {
            inputErrorFunc(userId, "게시글 작성자", regId)
        }
        if(articleContent){
            inputErrorFunc(articleContent, "게시글 내용", regArticleContent)
        }
        // notUserIdxErrorFunc(userIdx)

        const rows = []
        successFunc(res, rows)        
    }catch (e) {
        errorState(res, e)
    }
})

// 게시글 좋아요
router.post("/:articleIdx/article-like",

    checkParamInput(regIdx, "articleIdx"),
    notFoundIdx,
    createArticleLike,
    successResponse("게시글 좋아요 성공")
)

// 게시글 좋아요 삭제
router.delete("/:articleIdx/article-like", (req,res) => {
    const {articleIdx} = req.params
    const {userIdx} = req.session


    try {
        inputErrorFunc(articleIdx, "게시글", regIdx)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        // notFoundErrorFunc(rows, "게시글")
        conflictErrorFunc(rows, "좋아요 삭제 요청")

        successFunc(res, "댓글 좋아요 삭제 성공")
        
    } catch (e) {
        errorState(res, e)
    }    
})







module.exports = router