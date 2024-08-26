
const express = require("express")
const session = require("express-session")
const app = express()

const mariadb = require("./src/database/database")
mariadb.connect();

app.use(express.json()) // Object를 파싱해주는 명령어

app.use(
    session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30, // 30분
        // secure: true, // 보안연결에서만 전송되어야함을 나타내는것 https
    }
}))

const pageRouter = require("./src/Router/page")
app.use("/page", pageRouter)

const accountRouter = require("./src/Router/account")
app.use("/account", accountRouter)

const articleRouter = require("./src/Router/article")
app.use("/article", articleRouter)

const commentRouter = require("./src/Router/comment")
app.use("/comment", commentRouter)

const categoryRouter = require("./src/Router/category")
app.use("/category", categoryRouter)


app.listen(8000, () => {
    console.log("8000번 포트에서 웹 서버 실행됨")
})
