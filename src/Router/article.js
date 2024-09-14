const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regArticleCategory, regIdx, regArticleTitle, regArticleContent,regCommentContent} = require("../Constant/regx")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")

const {notFoundInformation} = require("../middleware/notFoundInformation")
const {checkConflict} = require("../middleware/checkConflict")
const {checkArticleLike,checkNotArticleLike} = require("../middleware/checkLike")

const {deleteArticleLike,deleteArticle,updateArticle,createArticleLike,createArticle,searchArticle,getArticle} = require("../service/articleService")


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
    createArticle
)

//게시글 수정
router.put("/:articleidx",
    checkinput(regIdx, "articleidx"),
    checkinput(regArticleTitle,"articletitle"),
    checkinput(regArticleContent,"articlecontent"),
    checkLogin,
    checkConflict("Article.article", 'articleidx'),
    updateArticle
)

// 게시글 삭제
router.delete("/:articleidx", 
    checkinput(regIdx, "articleidx"),
    checkLogin,
    checkConflict("Article.article", 'articleidx'),
    deleteArticle
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
    createArticleLike
)

// 게시글 좋아요 삭제
router.delete("/:articleidx/article-like",
    checkinput(regIdx, "articleidx"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Article.article','articleidx'),
    checkNotArticleLike,
    deleteArticleLike
)



module.exports = router