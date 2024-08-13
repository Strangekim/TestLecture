const express = require("express")

const app = express()

app.use(express.json()) // Object를 파싱해주는 명령어

app.get("/home", (req, res) => {
    res.sendFile(`${__dirname}/src/page/home.html`)
})

// express는 경로 접근을 무조건 막음
// 뭔가를 하려면, 무조건 API로 만들어둬야함

app.get("/article", (req, res) => {

})

app.post("/article", (req, res) => {
    const title = req.body.title
    const content = req.body.content

    // DB 통신 코드가 들어올 예정
})
