const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regArticleCategory, regIdx, regArticleTitle, regArticleContent,regCommentContent} = require("../Constant/regx")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")

const {notFoundInformation} = require("../middleware/accessDB/check/notFoundInformation")
const {checkConflict} = require("../middleware/accessDB/check/checkConflict")
const {checkArticleLike,checkArticleNotLike} = require("../middleware/accessDB/check/checkLike")
const {getArticle,searchArticle} = require("../middleware/accessDB/result/get")
const {createArticle,createArticleLike} = require("../middleware/accessDB/result/create")
const {updateArticle} = require("../middleware/accessDB/result/put")
const {deleteArticleLike,deleteArticle} = require("../middleware/accessDB/result/delete")

const successResponse = require("../Module/successResponse")



// 게시글 목록 가져오기
router.get("/",
    checkinput(regArticleCategory,"categoryidx"),
    notFoundInformation('Article.category','categoryidx'),
    getArticle
)

// 게시글 작성
router.post("/",
    checkinput(regArticleCategory,"categoryidx"),
    checkinput(regArticleTitle,"articletitle"),
    checkinput(regArticleContent,"articlecontent"),
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Article.category','categoryidx'),
    createArticle,
    successResponse("게시글 작성 성공")
)

//게시글 수정
router.put("/:articleidx",
    checkinput(regIdx, "articleidx"),
    checkinput(regArticleTitle,"articletitle"),
    checkinput(regArticleContent,"articlecontent"),
    checkLogin,
    checkConflict("Article.article", 'articleidx'),
    updateArticle,
    successResponse("게시글 수정 성공")
)

// 게시글 삭제
router.delete("/:articleidx", 
    checkinput(regIdx, "articleidx"),
    checkLogin,
    checkConflict("Article.article", 'articleidx'),
    deleteArticle,
    successResponse("게시글 삭제 성공")
)


// 게시글 검색
router.get("/search-article",
    checkinput(regCommentContent, "searchContent"),
    searchArticle
)

// 게시글 좋아요
router.post("/:articleidx/article-like",
    checkinput(regIdx, "articleidx"),
    checkLogin,
    notFoundInformation('Article.article','articleidx'),
    checkArticleLike,
    createArticleLike,
    successResponse("게시글 좋아요 성공")
)

// 게시글 좋아요 삭제
router.delete("/:articleidx/article-like",
    checkinput(regIdx, "articleidx"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Article.article','articleidx'),
    checkArticleNotLike,
    deleteArticleLike,
    successResponse("게시글 좋아요 삭제 성공")
)



module.exports = router