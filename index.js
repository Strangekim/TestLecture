
const express = require("express")
const session = require("express-session")
const app = express()

app.use(express.json()) // Object를 파싱해주는 명령어
app.use(
    session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30, // 30분
        // secure: true, // 보안연결에서만 전송되어야함을 나타내는것 https
        httpOnly: true
    }
}))

const regName = /^[가-힣]{1,8}$/;
const regPhone = /^\d{2,3}\d{3,4}\d{4}$/;
const regPW = /^\s{4,20}$/;
const regId = /^\s{1,20}$/;
const regArticleTitle = /^.{1,10}$/;
const regArticleCategory = /^[0-9]{1,2}$/;
const regArticleContent = /^.{1,500}$/;
const regCommentContent = /^.{1,100}$/;
// 전달받는 시간 데이터에 따라 다시 작성할 것
const regCreateTime = /^[0-9]$/;
const regIdx = /^[0-9]$/;
const regUserGrade = /^[01]$/;
const regCategoryName = /^[가-힣]{1,8}$/;


// 로그인
app.get("/log-in", (req,res) => {
    const userId = req.body.userId
    const userPw = req.body.userPw
    
    // const [userId,userPW] = req.body;

    if(!regId.test(userId)){
        res.send({
            "success" : false,
            "message" : "아이디를 올바르게 입력해주세요."
        })            
    }
    else if (!regPW.test(userPw)){
        res.send({
            "success" : false,
            "message" : "비밀번호를 올바르게 입력해주세요."
        })             
    } 
    else {
        res.send({
            "success" : true,
            "message" : "로그인 성공."                
        })
        // DB에서 넘어온 값을 보내야 할듯
        // req.session.userIdx = userIdx
        // req.session.userGrade = userGrade
        //계정 조회 후 보낼 값
    }
    
})

// 로그아웃
app.get("/log-out", (req,res) => {
    const userIdx = req.session.userIdx

    if(!userIdx) {
        res.send({
            "success" : false,
            "message" : "잘못된 접근입니다."                
        })        
    }
    // 또는 userIdx가 DB에 없을 경우 실패  ( 이런 경우가 있을 수가 있나? )
    else {
        res.send({
            "success" : true,
            "message" : "로그아웃 성공."                
        })
        req.session.destroy();          
    }
})

// 회원 탈퇴
app.delete("/account", (req,res) => {
    const userIdx = req.session.userIdx

    if(!userIdx){
        res.send({
            "success" : false,
            "message" : "로그인 후 이용해주세요."         
        })       
    }
    else {
        res.send({
        "success" : true,
        "message" : "탈퇴 성공."         
    })
    }
})  

// ID 찾기
app.get("/find-id", (req,res) => {
    const userPhone = req.body.userPhone

    //DB 연결
    if (!regPhone.test(userPhone)) {
        res.send({
            "success" : false,
            "message" : "전화번호를 올바르게 입력해주세요."
        })
    } 
    else {
        res.send({
            "success" : true,
            "message" : "ID정보입니다."
        })
    } 
    // else {
    //     res.send({
    //         "success" : false,
    //         "message" : "계정 정보가 존재하지 않습니다."
    //     })            
    // }
})

// PW 찾기
app.get("/find-pw", (req,res) => {
    const userPhone = req.body.userPhone
    const userName = req.body.userName

    //DB 연결


    if (!regPhone.test(userPhone)) {
        res.send({
            "success" : false,
            "message" : "전화번호를 올바르게 입력해주세요."
        })
    }
    else if (!regName.test(userName)){
        res.send({
            "success" : false,
            "message" : "이름을 올바르게 입력해주세요."
        })        
    } 
    else {
        res.send({
            "success" : true,
            "message" : "Pw정보입니다."
        })
    } 
})

// 계정 생성
app.post("/account", (req,res) => {

    const userName = req.body.userName
    const userId = req.body.userId
    const userPw = req.body.userPw
    const userPhone = req.body.userPhone
    const userGrade = req.body.userGrade

    // DB 연결
    
    // ID, Phone DB에서 조회 후 중복시 

    if(!regName.test(userName)){
        res.send({
            "success" : false,
            "message" : "잘못된 이름입니다."
        })
    }
    else if (!regId.test(userId)){
        res.send({
            "success" : false,
            "message" : "잘못된 아이디입니다."
        })
    }
    else if(!regPW.test(userPw)){
        res.send({
            "success" : false,
            "message" : "잘못된 비밀번호입니다."
        })
    }
    else if(!regPhone.test(userPhone)){
        res.send({
            "success" : false,
            "message" : "잘못된 전화번호입니다."
        })
    }
    else if(!regUserGrade.test(userGrade)){
        res.send({
            "success" : false,
            "message" : "잘못된 등급입니다."
        })
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userName" : userName,
                "userId" : userId,
                "userPw" : userPw,
                "userPhone" : userPhone,
                "userGrade" : userGrade,
                "comment" : "계정 생성 완료."
            }
        })            
    }
    
})

// 계정 수정
app.patch("/account", (req,res) => {

    const userId = req.body.userId
    const userPw = req.body.userPw
    const userGrade = req.body.userGrade

    if (!regId.test(userId)){
        res.send({
            "success" : false,
            "message" : "잘못된 아이디입니다."
        })
    }
    else if(!regPW.test(userPw)){
        res.send({
            "success" : false,
            "message" : "잘못된 비밀번호입니다."
        })
    }
    else if(!regUserGrade.test(userGrade)){
        res.send({
            "success" : false,
            "message" : "잘못된 등급입니다."
        })
    }
    else {
        res.send({
            "success" : true,
            "message" : {
                "userId" : userId,
                "userPw" : userPw,
                "userGrade" : userGrade,
                "comment" : "수정 완료."
            }
        })            
    }
})

// 게시글 목록 가져오기
app.get("/article/:articleCategory", (req,res) => {
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
app.post("/article", (req, res) => {
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
app.post("/article-like/:articleIdx", (req,res) => {
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
app.delete("/article-like/:articleIdx", (req,res) => {
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
app.put("/article/:articleIdx", (req,res) => {
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
app.delete("/article/:articleIdx", (req,res) => {
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
app.get("/article-search", (req,res) => {
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

//댓글 달기
app.post("/commet/:articleIdx", (req,res) => {
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
app.post("/comment-like/:commentIdx", (req,res) => {
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
app.delete("/comment-like/:commentIdx", (req,res) => {
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
app.get("/comment", (req,res) => {
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
app.patch("/comment/:commentIdx", (req,res) => {
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
app.delete("/comment/:commentIdx", (req,res) => {
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

//카테고리 추가
app.post("/articleCategory", (req,res) => {
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
app.patch("/articleCategory", (req,res) => {
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
app.delete("/category/:articleCategory", (req,res) => {
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


app.listen(8000, () => {
    console.log("8000번 포트에서 웹 서버 실행됨")
})
