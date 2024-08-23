const router = require("express").Router()


//카테고리 추가
router.post("/articleCategory", (req,res) => {
    const userGrade = req.session.userGrade
    const userIdx = req.session.userIdx
    const categoryName = req.body.categoryName

    if (!userIdx) {
        res.send({
            "success" : false,
            "message" : "로그인 후 접근해주십시오."
        })         
    }
    else if(userGrade != 1) {
        res.send({
            "success" : false,
            "message" : "카테고리 추가 권한이 없습니다."
        })         
    }
    else if (!regCategoryName.test(categoryName)){
        res.send({
            "success" : false,
            "message" : "카테고리 명을 알맞게 입력해주세요."
        })         
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userIdx" : userIdx,
                "categoryName" : categoryName,
                "successMessage" : "카테고리 추가 성공"
            }
        })        
    }

})
//카테고리 수정
router.patch("/articleCategory", (req,res) => {
    const userGrade = req.session.userGrade
    const userIdx = req.session.userIdx
    const categoryName = req.body.categoryName

    if (!userIdx) {
        res.send({
            "success" : false,
            "message" : "로그인 후 접근해주십시오."
        })         
    }
    else if(userGrade != 1) {
        res.send({
            "success" : false,
            "message" : "카테고리 추가 권한이 없습니다."
        })         
    }
    else if (!regCategoryName.test(categoryName)){
        res.send({
            "success" : false,
            "message" : "카테고리 명을 알맞게 입력해주세요."
        })         
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userIdx" : userIdx,
                "categoryName" : categoryName,
                "successMessage" : "카테고리 수정 성공"
            }
        })        
    }
})
//카테고리 삭제
router.delete("/category/:articleCategory", (req,res) => {
    const articleCategory = req.params.articleCategory
    const userGrade = req.session.userGrade
    const userIdx = req.session.userIdx

    if (!userIdx) {
        res.send({
            "success" : false,
            "message" : "로그인 후 접근해주십시오."
        })         
    }
    else if(userGrade != 1) {
        res.send({
            "success" : false,
            "message" : "카테고리 추가 권한이 없습니다."
        })         
    }
    else if (!regArticleCategory.test(articleCategory)) {
        res.send({
            "success" : false,
            "message" : "카테고리 정보를 확인해주십시오."
        })        
    }
    else {
        res.send({
            "success" : true,
            "message" : "카테고리 삭제 완료."            
        })
    }
})

module.exports = router