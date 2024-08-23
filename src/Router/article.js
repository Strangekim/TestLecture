const router = require("express").Router()


// 게시글 목록 가져오기
router.get("/article/:articleCategory", (req,res) => {
    const articleCategory = req.params.articleCategory
    const articlePageNation = req.query.articlePageNation
    const userIdx = req.session.userIdx

    if(!userIdx){
        res.send({
            "success" : false,
            "message" : "로그인 후 이용해주세요."
        })        
    }  
    else if (!regArticleCategory.test(articleCategory)) {
        res.send({
            "success" : false,
            "message" : "게시판 정보가 잘못되었습니다."
        })              
    } 
    else {
        res.send({
            "success" : true,
            "messege" : [{
                "boardIdx" : 1,
                "boardTitle" : "제목",
                "userIdx" : 12,
                "articleLike" : 0
            },{
                "boardIdx" : 2,
                "boardTitle" : "두번째 게시글",
                "userIdx" : 12,
                "articleLike" : 0              
            },{
                "boardIdx" : 3,
                "boardTitle" : "세번째 게시글",
                "userIdx" : 13,
                "articleLike" : 0               
            }
    ]})
    } 
    // else {
    //     res.send({
    //         "success" : false,
    //         "message" : "없는 게시판입니다."
    //     }) 
    // }
})

// 게시글 작성
router.post("/article", (req, res) => {
    const articleCategory = req.body.articleCategory
    const articleTitle = req.body.articleTitle
    const articleContent = req.body.articleContent
    const userIdx = req.session.userIdx

    // DB 통신 코드가 들어올 예정

    if(!userIdx){
        res.send({
            "success" : false,
            "message" : "로그인 후 이용해주세요."
        })           
    } 
    else if (!regArticleCategory.test(articleCategory)){
        res.send({
            "success" : false,
            "message" : "게시판 정보가 잘못되었습니다."
        }) 
    }
    else if (!regArticleTitle.test(articleTitle)){
        res.send({
            "success" : false,
            "message" : "게시글 제목이 잘못되었습니다."
        }) 
    }
    else if (!regArticleContent.test(articleContent)){
        res.send({
            "success" : false,
            "message" : "게시글 정보가 잘못되었습니다."
        }) 
    } 
    else {
        res.send({
            "success" : true,
            "message" : {
                "articleCategory" : articleCategory,
                "articleTitle" : articleTitle,
                "articleContent" : articleContent,
                "userIdx" : userIdx
            }
        })             
    }
    
})

// 게시글 좋아요
router.post("/article-like/:articleIdx", (req,res) => {
    const articleIdx = req.params.articleIdx
    const userIdx = req.session.userIdx

    // DB에서 가져와서 저장
    let articleLike = 0
    
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
    // 해당 게시글에 좋아요를 누른적이 없을때 
    else if (true) {
        articleLike++
        // DB에 articleIdx의 articleLike 업데이트
        res.send({
            "success" : true,
            "message" : `${articleLike} 좋아요가 되었습니다.`
        })  
    }  
})
// 게시글 좋아요 삭제
router.delete("/article-like/:articleIdx", (req,res) => {
    const articleIdx = req.params.articleIdx
    const userIdx = req.session.userIdx
        // DB에서 가져와서 저장
        let articleLike = 0
    
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
        else if (true) {
            articleLike--

            // DB에 articleIdx의 articleLike 업데이트
            res.send({
                "success" : true,
                "message" : `${articleLike} 좋아요가 되었습니다.`
            })  
        }    
})

//게시글 수정
router.put("/article/:articleIdx", (req,res) => {
    // 해당 articleIdx와 userIdx가 일치하지 않을경우
    // param으로 넘어온 데이터를 신뢰할 수 가 있는가? 그냥 게시글 작성자만 일치했을때 지워버려도 되는가?
    const articleIdx = req.params.articleIdx
    const userIdx = req.session.userIdx
    const articleCategory = req.body.articleCategory
    const articleTitle = req.body.articleTitle
    const articleContent = req.body.articleContent
    
    if(!userIdx){
        res.send({
            "success" : false,
            "message" : "로그인 후 이용해주세요."
        })             
    }
    else if (!regIdx.test(articleIdx)) {
        res.send({
            "success" : false,
            "message" : "게시글 정보를 확인해주세요."
        })        
    }
    else if (!regArticleCategory.test(articleCategory)){
        res.send({
            "success" : false,
            "message" : "게시판 정보가 잘못되었습니다."
        }) 
    }
    else if (!regArticleTitle.test(articleTitle)){
        res.send({
            "success" : false,
            "message" : "게시글 제목이 잘못되었습니다."
        }) 
    }
    else if (!regArticleContent.test(articleContent)){
        res.send({
            "success" : false,
            "message" : "게시글 정보가 잘못되었습니다."
        }) 
    }
    // 좋아요 갯수는 보내지 않음
    else {
        res.send({
            "success" : true,
            "message" : {
                "articleCategory" : articleCategory,
                "articleTitle" : articleTitle,
                "articleContent" : articleContent,
                "userIdx" : userIdx
            }
        })         
    } 
})

// 게시글 삭제
router.delete("/article/:articleIdx", (req,res) => {
    const articleIdx = req.params.articleIdx
    const userIdx = req.session.userIdx

    //해당 게시글의 userIdx와 session의 userIdx와 동일한지 확인. 이것만으로 충분한지..?
    if(!userIdx){
        res.send({
            "success" : false,
            "message" : "로그인 후 이용해주세요."
        })             
    }
    else if (!regIdx.test(articleIdx)) {
        res.send({
            "success" : false,
            "message" : "게시글 정보를 확인해주세요."
        })        
    }
    else {
        res.send({
            "success" : true,
            "message" : "삭제 완료."            
        })
    }
})

// 게시글 검색
router.get("/article-search", (req,res) => {
    const articleTitle = req.body.articleTitle
    const userId = req.body.userId
    const articleCreateTime = req.body.articleCreateTime

    // 게시글 작성 시간 정규표현식으로 예외처리
    if(!regId.test(userId)){
        res.send({
            "success" : false,
            "message" : `잘못된 형식의 아이디 입니다.`
        })         
    }
    else if(!regArticleTitle.test(articleTitle)){
        res.send({
            "success" : false,
            "message" : `잘못된 형식의 게시글 제목 입니다.`
        })         
    }
    else if(!regCreateTime.test(articleCreateTime)){
        res.send({
            "success" : false,
            "message" : `잘못된 형식의 시간 입니다.`
        })        
    }
    else {
        res.send({
            "success" : true,

            "messege" : [{
                "boardIdx" : 1,
                "boardTitle" : "제목",
                "userIdx" : 12,
                "articleLike" : 0
            },{
                "boardIdx" : 2,
                "boardTitle" : "두번째 게시글",
                "userIdx" : 12,
                "articleLike" : 0              
            },{
                "boardIdx" : 3,
                "boardTitle" : "세번째 게시글",
                "userIdx" : 13,
                "articleLike" : 0               
            }
            ],
            "successMessage" : "게시글 검색 성공"
        })
    }
})

module.exports = router