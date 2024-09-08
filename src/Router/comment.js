const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regArticleCategory, regIdx, regArticleTitle, regArticleContent, regCommentContent} = require("../Constant/regx")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")

const {createComment,createCommentLike} = require("../middleware/accessDB/result/create")
const {notFoundInformation} = require("../middleware/accessDB/check/notFoundInformation")
const {checkConflict} = require("../middleware/accessDB/check/checkConflict")
const {updateComment} = require("../middleware/accessDB/result/put")
const {checkCommentLike,checkNotCommentLike} = require("../middleware/accessDB/check/checkLike")
const {deleteCommentLike,deleteComment} = require("../middleware/accessDB/result/delete")
const {searchComment} = require("../middleware/accessDB/result/get")

const successResponse = require("../Module/successResponse")

//댓글 달기
router.post("/",
    checkinput(regIdx, "articleidx"),
    checkinput(regCommentContent, "commentcontent"),
    checkLogin,
    createComment,
    successResponse("댓글 달기 성공")
)

//댓글 수정
router.put("/:commentidx",
    checkinput(regIdx, "commentidx"),
    checkinput(regCommentContent, "commentcontent"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkConflict("Comment.comment","commentidx"),
    updateComment,
    successResponse("댓글 수정 성공")
)

//댓글 좋아요
router.post("/:commentidx/comment-like", 
    checkinput(regIdx, "commentidx"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkCommentLike,
    createCommentLike,
    successResponse("댓글 좋아요 성공")
)
// 댓글 좋아요 삭제
router.delete("/:commentidx/comment-like", 
    checkinput(regIdx, "commentidx"),
    checkLogin, 
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkNotCommentLike,
    deleteCommentLike,
    successResponse("댓글 좋아요 삭제 성공")
)


//댓글 삭제
router.delete("/:commentidx", 
    checkinput(regIdx, "commentidx"),
    checkLogin,
    notFoundInformation('Account.user','useridx'),
    notFoundInformation('Comment.comment','commentidx'),
    checkConflict("Comment.comment","commentidx"),
    deleteComment,
    successResponse("댓글 삭제 성공")       
)

// 댓글 검색
router.get("/", 
    checkinput(regCommentContent, "searchContent"),
    searchComment 
)



module.exports = router