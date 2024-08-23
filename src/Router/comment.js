const router = require("express").Router()

//댓글 달기
router.post("/commet/:articleIdx", (req,res) => {
    const articleIdx = req.params.articleIdx
    const userIdx = req.session.userIdx
    const commentContent = req.body.commentContent

    if(!userIdx){
        res.send({
            "success" : false,
            "message" : "로그인 후 이용해주세요."
        })             
    }
    else if(!regIdx.test(articleIdx)){
        res.send({
            "success" : false,
            "message" : "게시글 정보를 확인해주세요."
        })        
    }
    else if (!regCommentContent.test(commentContent)){
        res.send({
            "success" : false,
            "message" : "댓글 길이가 100자를 초과하였습니다."
        })           
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userIdx" : userIdx,
                "articleIdx" : articleIdx,
                "commentContent" : commentContent,
                "successMessage" : "댓글 작성 성공"
            }
        })  
    }
})

//댓글 좋아요
router.post("/comment-like/:commentIdx", (req,res) => {
    const commentIdx = req.params.commentIdx
    const userIdx = req.session.userIdx

    if(!regIdx.test(commentIdx)){
        res.send({
            "success" : false,
            "message" : "댓글 정보를 확인해주세요."
        })         
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userIdx" : userIdx,
                "commentIdx" : commentIdx,
                "successMessage" : "댓글 좋아요 성공"
            }
        })        
    }
})
// 댓글 좋아요 삭제
router.delete("/comment-like/:commentIdx", (req,res) => {
    const commentIdx = req.params.commentIdx
    const userIdx = req.session.userIdx

    if(!regIdx.test(commentIdx)){
        res.send({
            "success" : false,
            "message" : "댓글 정보를 확인해주세요."
        })         
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userIdx" : userIdx,
                "commentIdx" : commentIdx,
                "successMessage" : "댓글 좋아요 삭제"
            }
        })        
    } 
})

// 댓글 조회
router.get("/comment", (req,res) => {
    const searchCommentContent = req.body.searchCommentContent
    const searchCommentCreateTime = req.body.searchCommentCreateTime
    const searchUserId = req.body.searchUserId
    
    if(!regId.test(searchUserId)){
        res.send({
            "success" : false,
            "message" : "잘못된 형식의 아이디 입니다."
        })        
    }
    else if (!regCreateTime.test(searchCommentCreateTime)){
        res.send({
            "success" : false,
            "message" : "잘못된 형식의 시간 입니다."
        })         
    }
    else {
        res.send({
            "success" : true,
            "message" : [
                {
                    "commentIdx" : 1,
                    "commentCreateUser" : 12,
                    "commentCreateTime" : "2024-08-17 12:00:00",
                    "commentText" : "댓글 내용",
                    "successMessage" : "댓글 검색 성공"
                },
                {
                    "commentIdx" : 2,
                    "commentCreateUser" : 12,
                    "commentCreateTime" : "2024-08-17 13:00:00",
                    "commentText" : "댓글 내용",
                    "successMessage" : "댓글 검색 성공"
                },                
            ]
        })
    }
})

//댓글 수정
router.patch("/comment/:commentIdx", (req,res) => {
    const commentIdx = req.params.commentIdx
    const userIdx = req.session.userIdx
    const commentContent = req.body.commentContent
    
    if(!regIdx.test(commentIdx)){
        res.send({
            "success" : false,
            "message" : "댓글 정보를 확인해주세요."
        })         
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userIdx" : userIdx,
                "commentContent" : commentContent,
                "successMessage" : "댓글 작성 성공"
            }
        })
    }
})
//댓글 삭제
router.delete("/comment/:commentIdx", (req,res) => {
    const commentIdx = req.params.commentIdx
    const userIdx = req.session.userIdx
    
    if(!regIdx.test(commentIdx)){
        res.send({
            "success" : false,
            "message" : "댓글 정보를 확인해주세요."
        })         
    }
    // DB에서 해당 댓글이 해당 유저가 작성한게 맞다면
    else {
        res.send({
            "success" : true,
            "message" : {
                "commentIdx" : commentIdx,
                "successMessage" : "댓글 삭제 성공"
            }
        })        
    }

})

module.exports = router