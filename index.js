// REST API 설계 예시
// URI는 동사보다는 명사, 대문자보다는 소문자
// 마지막에 /를 미포함
// 언더바대신 하이픈
// 확장자 미포함
// 행위 미포함


// Path Param과 Query Param는 사용하는 입장에서는 거의 비슷한 기능으로 상용이 가능하다.
// 가독성의 영역도 있고 뭐 어쨋든 필수적은 값은 Param, optional한 것은 query로 결로이 나왔다고 한다.
//  

const express = require("express")
const session = require("express-session")
const app = express()

app.use(express.json()) // Object를 파싱해주는 명령어
app.use(
    session({
    secret: "keyboard cat",
    // 매 request마다 세션을 계속 다시 저장, 기본 true
    resave: false,
    // Uninitialized 란?
    //request 가 들어오면 해당 request에서 새로 생성된 session에 아무런 작업이 이루어지지 않는 상황
    // default : true
    saveUninitialized: true
}))

const regName = /^[가-힣]{1,8}$/;
const regPhone = /^\d{2,3}\d{3,4}\d{4}$/;
const regPW = /^.{4,20}$/;
const regId = /^.{1,20}$/;
const regArticleTitle = /^.{1,10}$/;
const regArticleCategory = /^[0-9]{1,2}$/;
const regArticleContent = /^.{1,500}$/;
const regIdx = /^[0-9]$/;
const regUserGrade = /^[01]$/;


// 로그인
app.get("/log-in", (req,res) => {
    const userId = req.body.userId
    const userPw = req.body.userPw


    if(!regId.test(userId)){
        res.send({
            "success" : false,
            "message" : "아이디를 올바르게 입력해주세요."
        })            
    }
    else if (!regPW.test(userPw)){
        res.send({
            "success" : false,
            "message" : "아이디를 올바르게 입력해주세요."
        })             
    } 
    else {
        res.send({
            "success" : true,
            "message" : "로그인 성공."                
        })
        // DB에서 넘어온 값을 보내야 할듯
        req.session.userIdx = userId
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

// ID, 비밀번호 찾기
app.get("/account", (req,res) => {
    const userPhone = req.body.userPhone
    const userId = req.body.userId

    //DB 연결


    if (!regPhone.test(userPhone)) {
        res.send({
            "success" : false,
            "message" : "전화번호를 올바르게 입력해주세요."
        })
    } 
    else if (!regId.test(userId)) {
        res.send({
            "success" : false,
            "message" : "아이디를 올바르게 입력해주세요."
        })
    } 
    else if (!userId) {
        res.send({
            "success" : true,
            "message" : "ID정보입니다."
        })
    } 
    else if (userId) {
        res.send({
            "success" : true,
            "message" : "PW정보입니다."
        })    
    } 
    // else {
    //     res.send({
    //         "success" : false,
    //         "message" : "계정 정보가 존재하지 않습니다."
    //     })            
    // }
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
                "userGrade" : userGrade
            }
        })            
    }
    
})

// 계정 수정




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
// 게시글 좋아요 테이블을 따로 운용해야할듯??
app.put("/article-like/:articleIdx", (req,res) => {
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
    // 해당 게시글에 이미 좋아요를 눌렀을 때
    else if (fale) {
        articleLike--
        // DB에 articleIdx의 articleLike 업데이트
        res.send({
            "success" : true,
            "message" : `${articleLike} 좋아요가 되었습니다.`
        })  
    }    
})

//게시글 수정
// put 은 모든 필드 필요, patch 는 일부 필드만 필요
// 단 patch 는 지원하지 않는 브라우저가 있음. IE8, Tomcat, PHP, DJanggo 등
app.patch("/article/:articleIdx", (req,res) => {
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

//댓글 달기
//댓글 좋아요
//댓글 수정
//댓글 삭제

//카테고리 추가
//카테고리 수정
//카테고리 삭제





app.listen(8000, () => {
    console.log("8000번 포트에서 웹 서버 실행됨")
})




// 댓글 조회, 생성, 수정, 삭제, 좋아요
// 관리자 전용 게시판 카테고리 추가, 수정, 삭제