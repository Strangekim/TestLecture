const router = require("express").Router()
const {regId, regPw, regName, regPhone, regUserGrade, regArticleCategory, regIdx, regArticleTitle, regArticleContent, regCommentContent, regCategoryName} = require("../Constant/regx")
const {notUserIdxErrorFunc, inputErrorFunc, cantAcessErrorFunc, notFoundErrorFunc, conflictErrorFunc, errorState, successFunc} = require("../Constant/error")


//카테고리 추가
router.post("/", (req,res) => {
    const {userGrade,userIdx} = req.session
    const {categoryName} = req.body

    try {
        inputErrorFunc(categoryName, "카테고리 이름", regCategoryName)

        // notUserIdxErrorFunc(userIdx)

        const rows = []

        // cantAcessErrorFunc(rows, "카테고리 생성 권한이 없습니다.")
        conflictErrorFunc(rows, "카테고리 명")

        successFunc(res, "카테고리 추가 성공")
        
    } catch (e) {
        errorState(res, e)
    }

})
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