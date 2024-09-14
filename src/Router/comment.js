const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regArticleCategory, regIdx, regArticleTitle, regArticleContent, regCommentContent} = require("../Constant/regx")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")

const {notFoundInformation} = require("../middleware/notFoundInformation")
const {checkConflict} = require("../middleware/checkConflict")
const {checkCommentLike,checkNotCommentLike} = require("../middleware/checkLike")

const {deleteCommentLike,deleteComment,updateComment,createCommentLike,createComment,searchComment} = require("../service/commentService")

//댓글 달기
router.post("/",
    checkinput(regIdx, "articleidx"),
    checkinput(regCommentContent, "commentcontent"),
    checkLogin,
    createComment
)

//댓글 수정
router.put("/:commentidx",
    checkinput(regIdx, "commentidx"),
    checkinput(regCommentContent, "commentcontent"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkConflict("Comment.comment","commentidx"),
    updateComment
)

//댓글 좋아요
router.post("/:commentidx/comment-like", 
    checkinput(regIdx, "commentidx"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkCommentLike,
    createCommentLike
)
// 댓글 좋아요 삭제
router.delete("/:commentidx/comment-like", 
    checkinput(regIdx, "commentidx"),
    checkLogin, 
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkNotCommentLike,
    deleteCommentLike
)


//댓글 삭제
router.delete("/:commentidx", 
    checkinput(regIdx, "commentidx"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkConflict("Comment.comment","commentidx"),
    deleteComment      
)

// 댓글 검색
router.get("/", 
    checkinput(regCommentContent, "searchContent"),
    searchComment 
)

module.exports = router