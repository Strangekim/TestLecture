const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regArticleCategory, regIdx, regArticleTitle, regArticleContent, regCommentContent} = require("../Constant/regx")
const {notUserIdxErrorFunc, inputErrorFunc, cantAcessErrorFunc, notFoundErrorFunc, conflictErrorFunc, errorState, successFunc} = require("../Constant/error")

//댓글 달기
router.post("/", (req,res) => {
    const {articleIdx,commentContent} = req.body
    const {userIdx} = req.session

    try {
        inputErrorFunc(articleIdx, "게시글", regArticleCategory)
        inputErrorFunc(commentContent, "댓글 내용", regCommentContent)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        notFoundErrorFunc(rows, "게시글")

        successFunc(res, "댓글 작성 성공")
        
    } catch (e) {
        errorState(res, e)
    }
})

//댓글 좋아요
router.post("/:commentIdx/comment-like", (req,res) => {
    const {commentIdx} = req.params
    const {userIdx} = req.session

    try {
        inputErrorFunc(commentIdx, "댓글", regIdx)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        // notFoundErrorFunc(rows, "댓글")
        conflictErrorFunc(rows, "좋아요 요청")

        successFunc(res, "댓글 좋아요 성공")
        
    } catch (e) {
        errorState(res, e)
    }

})
// 댓글 좋아요 삭제
router.delete("/:commentIdx/comment-like", (req,res) => {
    const {commentIdx} = req.params
    const {userIdx} = req.session

    try {
        inputErrorFunc(commentIdx, "댓글", regIdx)
        // notUserIdxErrorFunc(userIdx)

        const rows = []

        // notFoundErrorFunc(rows, "댓글")
        conflictErrorFunc(rows, "좋아요 삭제 요청")

        successFunc(res, "댓글 좋아요 삭제 성공")
        
    } catch (e) {
        errorState(res, e)
    }
})

// 댓글 검색
router.get("/", (req,res) => {
    const {searchContent,searchUser} = req.body
    const {userIdx} = req.session

    try{
        if(!searchContent && !searchUser) {
            const err = new Error("하나의 값은 입력되어야 합니다.")
            err.status = 400
            throw err           
        }
        if(searchContent) {
            inputErrorFunc(searchContent, "댓글 내용", regCommentContent)
        }
        if(userIdx) {
            inputErrorFunc(searchUser, "작성자", regId)
        }
        // notUserIdxErrorFunc(userIdx)

        const rows = []
        successFunc(res, rows)        
    }catch (e) {
        errorState(res, e)
    }
})

//댓글 수정
router.put("/:commentIdx", (req,res) => {
    const {commentIdx} = req.params
    const {userIdx} = req.session
    const {commentContent} = req.body
    
    try {
        inputErrorFunc(commentIdx, "댓글", regIdx)
        inputErrorFunc(commentContent, "댓글 내용", regCommentContent)

        // notUserIdxErrorFunc(userIdx)

        const rows = []

        cantAcessErrorFunc(rows, "본인의 게시글이 아닙니다.")

        // notFoundErrorFunc(rows, "댓글")

        successFunc(res, "댓글 수정 성공")
        
    } catch (e) {
        errorState(res, e)
    }
})
//댓글 삭제
router.delete("/:commentIdx", (req,res) => {
    const {commentIdx} = req.params
    const {userIdx} = req.session
    
    try {
        inputErrorFunc(commentIdx, "댓글", regIdx)

        // notUserIdxErrorFunc(userIdx)

        const rows = []

        // cantAcessErrorFunc(rows, "본인의 게시글이 아닙니다.")

        // notFoundErrorFunc(rows, "댓글")

        successFunc(res, "댓글 삭제 성공")
        
    } catch (e) {
        errorState(res, e)
    }

})

module.exports = router