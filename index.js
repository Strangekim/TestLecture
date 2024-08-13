
const express = require("express")
const session = require("express-session")
const app = express()

app.use(express.json()) // Object를 파싱해주는 명령어
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
}))

const regName = /^[가-힣]{1,8}$/;
const regPhone = /^\d{2,3}\d{3,4}\d{4}$/;
const regPW = /^.{4,20}$/;
const regId = /^.{1,20}$/;
const regArticleTitle = /^.{1,10}$/;
const regArticleCategory = /^[0-9]{1,2}$/;
const regArticleContent = /^.{1,500}$/;
const regUserIdx = /^[0-9]$/;
const regUserGrade = /^[01]$/;


// 계정 로그인 생성, 수정, 삭제
app.get("/LogIn", (req,res) => {
    const userId = req.body.userId
    const userPw = req.body.userPw

    if(!req){
        res.send({
            "success" : false,
            "message" : "잘못된 접근입니다."
        })
    } else {
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
        }else {
            res.send({
                "success" : true,
                "message" : "로그인 성공."                
            })
        //계정 조회 후 보낼 값
        }
    }
})
// ID, 비밀번호 찾기
app.get("/account", (req,res) => {
    const userPhone = req.body.userPhone
    const userId = req.body.userId

    //DB 연결


    if(!req){
        res.send({
            "success" : false,
            "message" : "잘못된 접근입니다."
        })
    } 
    else if (!regPhone.test(userPhone)) {
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
        // 계정 연결 실패시        
    } 
    else {
        res.send({
            "success" : false,
            "message" : "계정 정보가 존재하지 않습니다."
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
    if(!req){
        res.send({
            "success" : false,
            "message" : "잘못된 접근입니다."
        })
    } else {
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
    }
})



// 게시글 조회, 생성, 수정, 삭제, 좋아요
// 데이터 삽입

app.get("/article", (req,res) => {
    const articleCategory = req.query.articleCategory

    if(!req){
        res.send({
            "success" : false,
            "message" : "잘못된 접근입니다."
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
                "userIdx" : 12    
            },{
                "boardIdx" : 2,
                "boardTitle" : "두번째 게시글",
                "userIdx" : 12              
            },{
                "boardIdx" : 3,
                "boardTitle" : "세번째 게시글",
                "userIdx" : 13              
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

    if(!req){
        res.send({
            "success" : false,
            "message" : "잘못된 접근입니다."
        })           
    } 
    else if (req){
        if (!regArticleCategory.test(articleCategory)){
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
                    "userIdx" : "userIdx"
                }
            })             
        }
    }
})

// 데이터 수정
app.put("/article", (req, res) => {
    
})

// 데이터 삭제
app.delete("/article", (req, res) => {
    
})

app.listen(8000, () => {
    console.log("8000번 포트에서 웹 서버 실행됨")
})




// 댓글 조회, 생성, 수정, 삭제, 좋아요
// 관리자 전용 게시판 카테고리 추가, 수정, 삭제
